package com.skill.authentication.authentication.Controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.JsonNode;
import com.skill.authentication.authentication.Models.ResetPassword;
import com.skill.authentication.authentication.Models.User;
import com.skill.authentication.authentication.Repository.UserRepository;
import com.skill.authentication.authentication.Services.AuthenticationService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
public class AuthenticationController {
    private final AuthenticationService authService;
    private final UserRepository repo;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User request) throws Exception {
        if (repo.existsByEmpId(request.getEmpId())) {
            return ResponseEntity.badRequest().body("User already exists");
        }
        return ResponseEntity.ok(authService.register(request));
    }

    @GetMapping("/getusername/{empId}")
    public ResponseEntity<?> empName(@PathVariable String empId) {
        User user = repo.findByEmpId(empId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return ResponseEntity.ok(user.getFirstName());
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User request) {

        return ResponseEntity.ok(authService.authenticate(request));
    }

    @PostMapping("/email")
    public ResponseEntity<?> resetPassword(@RequestBody JsonNode requestBody) {
        // Extract the email address from the JSON object
        String email = requestBody.get("email").asText();

        return ResponseEntity.ok(authService.resetPasswordEmail(email));
    }

    @PostMapping("/resetpassword")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPassword request) {
        String password = request.getPassword();
        String token = request.getToken();
        return ResponseEntity.ok(authService.resetPassword(password, token));
    }

}
