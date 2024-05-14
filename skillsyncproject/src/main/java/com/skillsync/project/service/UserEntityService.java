package com.skillsync.project.service;

import org.springframework.stereotype.Service;

import com.skillsync.project.entity.UserEntity;
import com.skillsync.project.repository.UserEntityRepository;

@Service
public class UserEntityService {

	private UserEntityRepository userEntityRepository;

	public UserEntityService(UserEntityRepository userEntityRepository) {
		super();
		this.userEntityRepository = userEntityRepository;
	}
	
	public UserEntity createUserEntity(UserEntity userEntity) {
		return userEntityRepository.save(userEntity);
	}
	
}