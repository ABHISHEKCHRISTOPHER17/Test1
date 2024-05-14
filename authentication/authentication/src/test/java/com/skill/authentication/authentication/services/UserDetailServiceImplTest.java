package com.skill.authentication.authentication.services;

import org.junit.jupiter.api.Test;
import static org.mockito.ArgumentMatchers.any;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.when;
import org.springframework.boot.test.context.SpringBootTest;

import com.skill.authentication.authentication.Models.User;
import com.skill.authentication.authentication.Services.JwtService;
import com.skill.authentication.authentication.Services.UserDetailServiceImpl;

@SpringBootTest
class UserDetailServiceImplTest {

    @Mock
    private JwtService jwtService;

    @InjectMocks
    private UserDetailServiceImpl userDetailService;

    @Test
    void register_NewUser_Success() throws Exception {
        User testUser = new User();
        testUser.setEmpId("testEmpId");
        testUser.setPassword("testPassword");

        when(jwtService.generateToken(any(User.class))).thenReturn("testToken");

        // Your test code here
    }
}
