package com.skill.authentication.authentication.Services;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.skill.authentication.authentication.Models.AuthenticationResponse;
import com.skill.authentication.authentication.Models.User;
import com.skill.authentication.authentication.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Service
public class AuthenticationService {
    private static final Logger logger = LoggerFactory.getLogger(AuthenticationService.class);
    @Value("${spring.frontend_url}")
    private String frontendUrl;
    private final UserRepository repo;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final JavaMailSender emailSender;

    public AuthenticationService(UserRepository repo, PasswordEncoder passwordEncoder, JwtService jwtService,
            AuthenticationManager authenticationManager, JavaMailSender emailSender) {
        this.repo = repo;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
        this.emailSender = emailSender;
    }

    public ResponseEntity<AuthenticationResponse> register(User request) {
        User user = new User();
        user.setEmpId(request.getEmpId());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole());
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        repo.save(user);

        String token = jwtService.generateToken(user);
        return ResponseEntity.ok(new AuthenticationResponse(token));
    }

    public ResponseEntity<AuthenticationResponse> authenticate(User request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
            User user = repo.findByEmpId(request.getUsername())
                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));
            user.setRememberMe(request.isRememberMe());
            repo.save(user);
            String token = jwtService.generateToken(user);
            return ResponseEntity.ok(new AuthenticationResponse(token));
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new AuthenticationResponse("Bad Credentials"));
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new AuthenticationResponse("Authentication failed"));
        }

    }

    public ResponseEntity<AuthenticationResponse> resetPasswordEmail(String email) {
        // Trim the email input to remove leading/trailing whitespace
        email = email.trim();

        try {
            Optional<User> userOptional = repo.findByEmail(email);
            User user = userOptional.orElseThrow(() -> new UsernameNotFoundException("User not found with email"));
            String token = jwtService.generateToken(user);
            sendResetPasswordEmail(email, token);
            return ResponseEntity.ok(new AuthenticationResponse("Reset Email Sent Successfully"));
        } catch (Exception e) {
            // Log detailed error message
            logger.error("Failed to reset password for email {}: {}", email, e.getMessage());
            // Return error response
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new AuthenticationResponse("Failed to reset password. Please try again later."));
        }
    }

    public ResponseEntity<AuthenticationResponse> resetPassword(String password, String token) {
        String email = jwtService.extractEmail(token);

        try {
            User user = repo.findByEmail(email)
                    .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
            user.setPassword(passwordEncoder.encode(password));
            repo.save(user);
            token = jwtService.generateToken(user);
            return ResponseEntity.ok(new AuthenticationResponse(token));
        } catch (Exception e) {
            // Log detailed error message
            logger.error("Failed to reset password for email {}: {}", email, e.getMessage());
            // Return error response
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new AuthenticationResponse("Failed to reset password. Please try again later."));
        }
    }

    public void sendResetPasswordEmail(String email, String token) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(email);
            message.setSubject("Reset Password");
            message.setText("Dear user,\n\nPlease click on the link below to reset your password:\n\n"
                    + "http://" + frontendUrl + "/resetpassword1/?token=" + token + "\n\n"
                    + "This link will expire in 24 hours.\n\nRegards,\nYour Application");

            emailSender.send(message);
        } catch (Exception e) {
            // Log detailed error message
            e.printStackTrace();
            logger.error("Failed to send reset password email to {}: {}", email, e.getMessage());
        }
    }
}
