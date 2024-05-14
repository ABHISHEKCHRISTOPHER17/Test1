package com.skill.authentication.authentication.Configurations;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.RememberMeServices;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.rememberme.RememberMeAuthenticationFilter;
import org.springframework.security.web.authentication.rememberme.TokenBasedRememberMeServices;

import com.skill.authentication.authentication.Filter.JwtAuthenticationEntryPoint;
import com.skill.authentication.authentication.Filter.JwtAuthenticationFilter;
import com.skill.authentication.authentication.Services.UserDetailServiceImpl;

import lombok.AllArgsConstructor;

@Configuration
@EnableWebSecurity
@AllArgsConstructor
public class SecurityConfig {
    private final UserDetailServiceImpl userDetailsServiceImpl;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final JwtAuthenticationEntryPoint unauthorizedHandler;

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(AbstractHttpConfigurer::disable)
                .exceptionHandling(exception -> exception.authenticationEntryPoint(unauthorizedHandler))
                .authorizeHttpRequests(req -> req
                        .requestMatchers("/login/**", "/register/**", "/email/**", "/getusername/{empId}",
                                "/resetpassword/**")
                        .permitAll()
                        .anyRequest()
                        .authenticated())
                .userDetailsService(userDetailsServiceImpl)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    @Bean
    RememberMeServices rememberMeServices(UserDetailsService userDetailsService) {
        // Configure RememberMeServices with a secret key and userDetailsService
        return new TokenBasedRememberMeServices("uniqueAndSecretKey", userDetailsService);
    }

    @Bean
    RememberMeAuthenticationFilter rememberMeFilter() throws Exception {
        RememberMeAuthenticationFilter rememberMeFilter = new RememberMeAuthenticationFilter(
                authenticationManager(null), rememberMeServices(userDetailsServiceImpl));
        // Set any additional properties for the RememberMeAuthenticationFilter
        return rememberMeFilter;
    }

}
