package com.skillsync.project;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.Bean;

import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.services.s3.S3Client;

@SpringBootApplication
@EnableDiscoveryClient
public class SkillsyncprojectApplication {

	public static void main(String[] args) {
		SpringApplication.run(SkillsyncprojectApplication.class, args);
	}
	

}
