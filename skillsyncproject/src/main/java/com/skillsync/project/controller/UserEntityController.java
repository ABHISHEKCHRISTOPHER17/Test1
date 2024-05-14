package com.skillsync.project.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skillsync.project.entity.UserEntity;
import com.skillsync.project.service.UserEntityService;

@RestController
@RequestMapping("/api/entity")
public class UserEntityController {
	
	private UserEntityService userEntityService;

	

	
	public UserEntityController(UserEntityService userEntityService) {
		super();
		this.userEntityService = userEntityService;
	}




	@PostMapping("/data")
	public UserEntity createUserEntity(@RequestBody UserEntity user) {
		return userEntityService.createUserEntity(user);
	}

}
