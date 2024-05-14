package com.skillsync.project.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;

@Entity
public class UserData {
   
	
	@Column(unique = true)
	private String email;
	@Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String emp_id;
    private String name;
    private String password;
    
//    @Lob
//    @Column(columnDefinition = "LONGBLOB")
//    private byte[] userImage;
    
    private String imageKey;
    
//    
    
    public enum UserRole {
    	USER, ADMIN;
    }
    
    @Enumerated(EnumType.STRING)
    @Column(length = 5, columnDefinition = "ENUM('USER', 'ADMIN')")
    private UserRole role;
    
    
    private String business_unit;
    private String account;
    private String level;
    private String base_branch;
    private String domain;
    private String area;
    private String directors;
    private String reporting_manager;
    private String rm_emp_id;
    private String service_delivery_manager;
    private String sdm_emp_id;
    private String domain_manager;
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
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
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public UserRole getRole() {
		return role;
	}
	public void setRole(UserRole role) {
		this.role = role;
	}
	public String getBusiness_unit() {
		return business_unit;
	}
	public void setBusiness_unit(String business_unit) {
		this.business_unit = business_unit;
	}
	public String getAccount() {
		return account;
	}
	public void setAccount(String account) {
		this.account = account;
	}
	public String getLevel() {
		return level;
	}
	public void setLevel(String level) {
		this.level = level;
	}
	public String getBase_branch() {
		return base_branch;
	}
	public void setBase_branch(String base_branch) {
		this.base_branch = base_branch;
	}
	
	
	public String getImageKey() {
		return imageKey;
	}
	public void setImageKey(String imageKey) {
		this.imageKey = imageKey;
	}
	public String getDomain() {
		return domain;
	}
	public void setDomain(String domain) {
		this.domain = domain;
	}
	public String getArea() {
		return area;
	}
	public void setArea(String area) {
		this.area = area;
	}
	public String getDirectors() {
		return directors;
	}
	public void setDirectors(String directors) {
		this.directors = directors;
	}
	public String getReporting_manager() {
		return reporting_manager;
	}
	public void setReporting_manager(String reporting_manager) {
		this.reporting_manager = reporting_manager;
	}
	public String getRm_emp_id() {
		return rm_emp_id;
	}
	public void setRm_emp_id(String rm_emp_id) {
		this.rm_emp_id = rm_emp_id;
	}
	public String getService_delivery_manager() {
		return service_delivery_manager;
	}
	public void setService_delivery_manager(String service_delivery_manager) {
		this.service_delivery_manager = service_delivery_manager;
	}
	public String getSdm_emp_id() {
		return sdm_emp_id;
	}
	public void setSdm_emp_id(String sdm_emp_id) {
		this.sdm_emp_id = sdm_emp_id;
	}
	public String getDomain_manager() {
		return domain_manager;
	}
	public void setDomain_manager(String domain_manager) {
		this.domain_manager = domain_manager;
	}
	
	
	
//	public byte[] getUserImage() {
//		return userImage;
//	}
//	public void setUserImage(byte[] userImage) {
//		this.userImage = userImage;
//	}

	public UserData() {
		super();
		// TODO Auto-generated constructor stub
	}
public UserData(String email, String emp_id, String name, String password, String imageKey, UserRole role,
		String business_unit, String account, String level, String base_branch, String domain, String area,
		String directors, String reporting_manager, String rm_emp_id, String service_delivery_manager,
		String sdm_emp_id, String domain_manager) {
	super();
	this.email = email;
	this.emp_id = emp_id;
	this.name = name;
	this.password = password;
	this.imageKey = imageKey;
	this.role = role;
	this.business_unit = business_unit;
	this.account = account;
	this.level = level;
	this.base_branch = base_branch;
	this.domain = domain;
	this.area = area;
	this.directors = directors;
	this.reporting_manager = reporting_manager;
	this.rm_emp_id = rm_emp_id;
	this.service_delivery_manager = service_delivery_manager;
	this.sdm_emp_id = sdm_emp_id;
	this.domain_manager = domain_manager;
}
	
    
    
}