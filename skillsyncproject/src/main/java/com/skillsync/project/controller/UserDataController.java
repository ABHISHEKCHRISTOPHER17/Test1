//package com.skillsync.project.controller;
//

package com.skillsync.project.controller;

import java.io.IOException;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.skillsync.project.entity.UserData;
import com.skillsync.project.repository.UserDataRepository;
import com.skillsync.project.service.UserDataService;

@RestController
@RequestMapping(value = "/api/users")

public class UserDataController {

    @Autowired
    private UserDataService userDataService;
    
    @Autowired
    private UserDataRepository userRepository;

    @Autowired
    private AmazonS3 amazonS3;
    
    

    @Value("${aws.s3.bucketName}")
    private String bucketName;

    private static final long MAX_FILE_SIZE_BYTES = 2 * 1024 * 1024; // 2MB max size

    @PostMapping("/{emp_id}/enterData")
    public ResponseEntity<String> uploadUserData(@PathVariable String emp_id,
            @RequestBody UserData userData) {
        try {
            // Validate input parameters if needed
           // UserRole userRole = userData.getRole();

            // Set emp_id to the user data
            userData.setEmp_id(emp_id);

            // Save UserData to the database
            userDataService.createUserData(userData);

            return ResponseEntity.status(HttpStatus.OK).body("User data uploaded successfully.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid role provided.");
        }
        
        catch (DataIntegrityViolationException e) {
            // Check if the exception is due to a unique constraint violation (e.g., duplicate email)
            if (e.getCause() instanceof org.hibernate.exception.ConstraintViolationException) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email already exists.");
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal server error occurred.");
            }
        }
    }
    
    
    
    @PostMapping("/{empId}/image")
    public ResponseEntity<String> uploadImage(@PathVariable String empId, @RequestParam("file") MultipartFile file) {
    	userDataService.uploadImageAndUpdateUser(empId, file);
        return ResponseEntity.status(HttpStatus.CREATED).body("Image uploaded successfully");
    }


    
//    @GetMapping("/{empId}/image")
//    public ResponseEntity<byte[]> getUserImage(@PathVariable String empId) {
//        // Retrieve user from database based on empId (you can use UserRepository)
//
//        // For demonstration purpose, let's assume we have a method to retrieve the image key associated with the user
//        String imageKey = getImageKeyByEmpId(empId);
//
//        if (imageKey == null) {
//            return ResponseEntity.notFound().build();
//        }
//
//        // Retrieve the image from S3 based on the key
//        S3Object s3Object = amazonS3.getObject(bucketName, imageKey);
//
//        // Prepare response headers
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.IMAGE_JPEG); // Set content type as per your image type (e.g., JPEG, PNG)
//
//        // Convert S3Object (image content) to byte array
//        byte[] imageBytes;
//        try {
//            imageBytes = IOUtils.toByteArray(s3Object.getObjectContent());
//        } catch (IOException e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
//        }
//
//        // Return ResponseEntity with image bytes and headers
//        return ResponseEntity.ok().headers(headers).body(imageBytes);
//    }
//    
//    private String getImageKeyByEmpId(String empId) {
//        // Implement your logic to fetch image key from database based on empId
//        // Example: User user = userRepository.findById(empId).orElse(null);
//        // return (user != null) ? user.getImageKey() : null;
//        return "example-image-key"; // Placeholder for demonstration
//    }
//
//    @GetMapping("/{empId}/image")
//    public ResponseEntity<byte[]> getUserImage(@PathVariable String empId) {
//        String imageKey = getImageKeyByEmpId(empId);
//
//        if (imageKey == null) {
//            return ResponseEntity.notFound().build();
//        }
//
//        try {
//            S3Object s3Object = amazonS3.getObject(bucketName, imageKey);
//            InputStream objectData = s3Object.getObjectContent();
//
//            // Prepare response headers
//            HttpHeaders headers = new HttpHeaders();
//            headers.setContentType(MediaType.IMAGE_JPEG); // Set content type as per your image type
//
//            // Convert InputStream to byte array
//            byte[] imageBytes = IOUtils.toByteArray(objectData);
//
//            // Return ResponseEntity with image bytes and headers
//            return ResponseEntity.ok().headers(headers).body(imageBytes);
//        } catch (AmazonS3Exception e) {
//            if (e.getStatusCode() == HttpStatus.NOT_FOUND.value()) {
//                return ResponseEntity.notFound().build();
//            } else {
//                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
//            }
//        } catch (IOException e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
//        }
//    }
//
//    private String getImageKeyByEmpId(String empId) {
//        Optional<UserData> userDataOptional = userRepository.findById(empId);
//        return userDataOptional.map(UserData::getImageKey).orElse(null);
//    }
    
    

//    public String getImageKeyByEmpId(String empId) {
//        Optional<UserData> userDataOptional = userRepository.findById(empId);
//        return userDataOptional.map(UserData::getImageKey).orElse(null);
//    }
//    
    
    //************************Dhanush code*******************************
    
//    
//    @GetMapping("/{empId}/image")
//    public ResponseEntity<byte[]> getUserImage(@PathVariable String empId) {
//        String imageKey = getImageKeyByEmpId(empId);
//
//        if (imageKey == null) {
//            System.out.println("Image key is null for empId: " + empId);
//            return ResponseEntity.notFound().build();
//        }
//
//        try {
//            System.out.println("Retrieving image from S3 with key: " + imageKey);
//            S3Object s3Object = amazonS3.getObject(bucketName, imageKey);
//            InputStream objectData = s3Object.getObjectContent();
//
//            // Prepare response headers
//            HttpHeaders headers = new HttpHeaders();
//            headers.setContentType(MediaType.IMAGE_JPEG); // Set content type as per your image type
//
//            // Convert InputStream to byte array
//            byte[] imageBytes = IOUtils.toByteArray(objectData);
//
//            // Return ResponseEntity with image bytes and headers
//            return ResponseEntity.ok().headers(headers).body(imageBytes);
//        } catch (AmazonS3Exception e) {
//            if (e.getStatusCode() == HttpStatus.NOT_FOUND.value()) {
//                System.out.println("Image not found in S3 for key: " + imageKey);
//                return ResponseEntity.notFound().build();
//            } else {
//                System.out.println("Error retrieving image from S3: " + e.getMessage());
//                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
//            }
//        } catch (IOException e) {
//            System.out.println("IOException while retrieving image from S3: " + e.getMessage());
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
//        }
//    }
//    
    
    
//    @GetMapping("/{empId}/image")
//    public ResponseEntity<byte[]> getEmployeeImage(@PathVariable String empId) {
//        // Retrieve UserData by empId
//        UserData userData = userDataService.getUserDetailsById(empId)
//                .orElseThrow(() -> new RuntimeException("Employee not found with ID: " + empId));
//
//        // Retrieve imageKey from UserData
//        String imageKey = userData.getImageKey();
//
//        // Fetch image from S3 bucket based on imageKey
//        byte[] imageBytes = userDataService.getEmployeeImageFromS3(imageKey);
//
//        // Return image bytes with appropriate content type
//        return ResponseEntity.ok()
//                .contentType(MediaType.IMAGE_JPEG) // Set appropriate content type (e.g., IMAGE_JPEG or IMAGE_PNG)
//                .body(imageBytes);
//    }
//    

    @GetMapping("/displayImage/{empId}")
    public ResponseEntity<Resource> displayImage(@PathVariable String empId) {
        Optional<UserData> optionalUserData = userDataService.getUserDetailsById(empId);

        if (optionalUserData.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        UserData userData = optionalUserData.get();
        if (userData.getImageKey() == null) {
            return ResponseEntity.notFound().build();
        }

        String imageUrl = userData.getImageKey();

        try {
            // Create a URL object from the imageUrl
            URL url = new URL(imageUrl);

            // Read the image bytes from the URL
            byte[] imageBytes = url.openStream().readAllBytes();
            
            Path tempImage = Files.createTempFile("image", ".jpg");
            Files.copy(url.openStream(), tempImage, java.nio.file.StandardCopyOption.REPLACE_EXISTING);

            Resource resource = new org.springframework.core.io.UrlResource(tempImage.toUri());
            // Create a ByteArrayResource to wrap the image bytes
//            ByteArrayResource resource = new ByteArrayResource(imageBytes);

            // Prepare response entity with the image data and content type
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=image.jpg")
                    .contentType(MediaType.IMAGE_JPEG)
                    .contentLength(imageBytes.length)
                    .body(resource);

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.notFound().build();
        }
    }

  
    @GetMapping("/{id}")
    public ResponseEntity<UserData> getUserDetailsById(@PathVariable String id) {
        // Retrieve UserData entity by id
        Optional<UserData> userDataOptional = userDataService.getUserDetailsById(id);

        if (userDataOptional.isPresent()) {
            // Get the UserData object
            UserData userData = userDataOptional.get();

            // Customize the UserData object to exclude certain fields
            userData.setEmail(null); // Exclude 'email'
            userData.setName(null); // Exclude 'name'
            userData.setPassword(null); // Exclude 'password'
            userData.setRole(null); // Exclude 'role'

            // Optionally, set userImage to null or remove the field as per requirements
            // userData.setUserImage(null); 

            // Return modified UserData object in the response
            return ResponseEntity.ok(userData);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/allusers")
    public ResponseEntity<List<UserData>> getAllUsers() {
        // Retrieve all UserData entities
        List<UserData> allUserData = userDataService.getAllUsers();

        // Customize each UserData object to exclude sensitive fields
        for (UserData userData : allUserData) {
           
            userData.setPassword(null);   // Exclude 'password'
            
            // Optionally, set userImage to null or remove the field as per requirements
            // userData.setUserImage(null); 
        }

        // Return the modified list of UserData objects in the response
        return ResponseEntity.ok(allUserData);
    }


}

