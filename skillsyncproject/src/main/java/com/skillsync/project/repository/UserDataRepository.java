package com.skillsync.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.skillsync.project.entity.UserData;



@Repository
public interface UserDataRepository extends JpaRepository<UserData, String> {

}
