//package com.skillsync.project;
//
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//import com.amazonaws.auth.AWSStaticCredentialsProvider;
//import com.amazonaws.auth.BasicAWSCredentials;
//import com.amazonaws.services.s3.AmazonS3;
//import com.amazonaws.services.s3.AmazonS3ClientBuilder;
//
//import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
//import software.amazon.awssdk.auth.credentials.AwsCredentialsProvider;
//import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
//import software.amazon.awssdk.regions.Region;
//import software.amazon.awssdk.services.s3.S3Client;
//
//@Configuration
//public class AwsConfig {
//	
//	 @Value("${aws.accessKeyId}")
//	    private String accessKeyId;
//
//	    @Value("${aws.secretKey}")
//	    private String secretKey;
//
//	    @Value("${aws.s3.region}")
//	    private String region;
//	    
//	    
//	    @Bean
//	    public S3Client s3Client() {
//	        AwsBasicCredentials awsCredentials = AwsBasicCredentials.create(accessKeyId, secretKey);
//	        AwsCredentialsProvider credentialsProvider = StaticCredentialsProvider.create(awsCredentials);
//
//	        return S3Client.builder()
//	                       .credentialsProvider(credentialsProvider)
//	                       .region(Region.of(region))
//	                       .build();
//	    }
//	    
//	    @Bean
//	    public AmazonS3 amazonS3() {
//	        BasicAWSCredentials awsCredentials = new BasicAWSCredentials(accessKeyId, secretKey);
//	        return AmazonS3ClientBuilder.standard()
//	                .withCredentials(new AWSStaticCredentialsProvider(awsCredentials))
//	                .withRegion(region)
//	                .build();
//	    }
//
//}
