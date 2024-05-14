package com.skillsync.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.skillsync.project.entity.UserEntity;



@Repository
public interface UserEntityRepository extends JpaRepository<UserEntity, String> {

}

