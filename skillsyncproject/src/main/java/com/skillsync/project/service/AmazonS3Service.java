package com.skillsync.project.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.S3Object;

import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.AwsCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.UUID;
import java.io.InputStream;

@Service
public class AmazonS3Service {
	
	private  AmazonS3 amazonS3;

    @Value("${aws.accessKeyId}")
    private String accessKeyId;

    @Value("${aws.secretKey}")
    private String secretKey;

    @Value("${aws.s3.bucketName}")
    private String bucketName;

    @Value("${aws.s3.region}")
    private String region;

    public String uploadImage(MultipartFile file) {
        // Create S3 client
        S3Client s3Client = createS3Client();

        try {
            // Generate unique key for the uploaded file
            String key = generateKey(file.getOriginalFilename());

            // Convert MultipartFile content to bytes
            byte[] fileContent = file.getBytes();

            // Upload file to S3 bucket
            s3Client.putObject(PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(key)
                    .contentType(file.getContentType())
                    .build(),
                    RequestBody.fromBytes(fileContent)); // Use RequestBody.fromBytes() to provide the file content as bytes

            // Return the S3 URL of the uploaded object
            return s3Client.utilities().getUrl(builder -> builder.bucket(bucketName).key(key)).toString();
        } catch (IOException e) {
            throw new RuntimeException("Failed to upload image to S3", e);
        }
    }

    private S3Client createS3Client() {
        AwsCredentials credentials = AwsBasicCredentials.create(accessKeyId, secretKey);
        return S3Client.builder()
                       .region(Region.of(region))
                       .credentialsProvider(StaticCredentialsProvider.create(credentials))
                       .build();
    }

    private String generateKey(String originalFilename) {
        return UUID.randomUUID().toString() + "_" + originalFilename;
    }
    
    
    public byte[] downloadImage(String imageKey) throws IOException {
        S3Object s3Object = amazonS3.getObject(bucketName, imageKey);
        InputStream inputStream = s3Object.getObjectContent();
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        byte[] buffer = new byte[1024];
        int len;
        while ((len = inputStream.read(buffer)) != -1) {
            outputStream.write(buffer, 0, len);
        }
        inputStream.close();
        return outputStream.toByteArray();
    }
}
