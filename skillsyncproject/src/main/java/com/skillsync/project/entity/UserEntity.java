package com.skillsync.project.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class UserEntity {
    public UserEntity() {
		super();
		// TODO Auto-generated constructor stub
	}
	public UserEntity(String emp_id, String name, String email, String password) {
		super();
		this.emp_id = emp_id;
		this.name = name;
		this.email = email;
		this.password = password;
	}
	@Id
    private String emp_id;
    private String name;
    @Column(unique = true)
    private String email;
    private String password;
	
    

	public String getEmp_id() {
		return emp_id;
	}
	public void setEmp_id(String emp_id) {
		this.emp_id = emp_id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	
    
    
}
