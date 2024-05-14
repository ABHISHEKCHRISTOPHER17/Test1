package com.skill.authentication.authentication.Services;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.skill.authentication.authentication.Repository.UserRepository;

import lombok.Data;


@Service
@Data
public class UserDetailServiceImpl implements UserDetailsService {

    private final UserRepository repo;

    public UserDetailServiceImpl(UserRepository repo) {
        this.repo = repo;
    }

    @Override
    public UserDetails loadUserByUsername(String empId) throws UsernameNotFoundException {
        return repo.findByEmpId(empId).orElseThrow(() -> new UsernameNotFoundException("empId not found"));
    }

}
