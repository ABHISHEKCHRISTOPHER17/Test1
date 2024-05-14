package com.skillsync.project.service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.skillsync.project.entity.UserData;
import com.skillsync.project.repository.UserDataRepository;

@Service
public class UserDataService {
    
    @Autowired
    private UserDataRepository userDataRepository;
    
    @Autowired
    private AmazonS3Service amazonS3Service;
    
    
    
    //@Autowired
    public UserDataService(UserDataRepository userDataRepository, AmazonS3Service amazonS3Service) {
		super();
		this.userDataRepository = userDataRepository;
		this.amazonS3Service = amazonS3Service;
	}
//    public Optional<UserData> getUserImagebyId(String emp_id) {
//    	return userDataRepository.findById(emp_id);
//    }
 
    
    public UserData createUserData(UserData user) {
    	return userDataRepository.save(user);
    }
    
    public void uploadImageAndUpdateUser(String empId, MultipartFile imageFile) {
        // Upload image to S3 and get the generated key
        String imageKey = amazonS3Service.uploadImage(imageFile);

        // Update user's image key in database
        UserData user = userDataRepository.findById(empId).orElseThrow(() -> new RuntimeException("User not found"));
        user.setImageKey(imageKey);
        userDataRepository.save(user);
    }
    
//    public Optional<UserData> getUserDetailsbyId(UserData user,String emp_id) {
//    	return userDataRepository.findById(emp_id);
//    }
    
    public Optional<UserData> getUserDetailsById(String id) {
        return userDataRepository.findById(id);
    }
    
    public List<UserData> getAllUsers() {
        List<UserData> allUsers = userDataRepository.findAll();


        return allUsers;
    }
    
    public byte[] getEmployeeImageFromS3(String imageKey) {
        try {
            // Fetch image bytes from S3 bucket using the provided imageKey
            return amazonS3Service.downloadImage(imageKey);
        } catch (IOException e) {
            throw new RuntimeException("Failed to fetch employee image from S3", e);
        }
    }
    
     
}