package com.skill.authentication.authentication.Filter;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

  private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationEntryPoint.class);

  @Override
  public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException)
      throws IOException, ServletException {
    String endpoint = request.getRequestURI();
    String errorMessage = authException.getMessage();
    String timestamp = LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME);
    String logMessage = String.format("[%s] Error occurred at endpoint '%s': %s", timestamp, endpoint, errorMessage);

    // Log detailed error message including stack trace
    StringWriter sw = new StringWriter();
    PrintWriter pw = new PrintWriter(sw);
    authException.printStackTrace(pw);
    String stackTrace = sw.toString();
    logger.error(logMessage + "\n" + stackTrace);

    // Set response status code based on exception type
    int statusCode;
    if (authException instanceof UsernameNotFoundException) {
      statusCode = HttpServletResponse.SC_NOT_FOUND; // 404
    } else if (authException instanceof BadCredentialsException) {
      statusCode = HttpServletResponse.SC_BAD_REQUEST;
    } else {
      statusCode = HttpServletResponse.SC_INTERNAL_SERVER_ERROR;
    }

    // Set response content type and status code
    response.setContentType(MediaType.APPLICATION_JSON_VALUE);
    response.setStatus(statusCode);

    // Create response body with error details
    final Map<String, Object> body = new HashMap<>();
    body.put("status", statusCode);
    body.put("error", HttpStatus.valueOf(statusCode).getReasonPhrase());
    body.put("message", authException.getMessage());
    body.put("path", request.getServletPath());
    body.put("timestamp", timestamp);
    body.put("exception", authException.getClass().getName());
    body.put("stackTrace", stackTrace);

    // Write response body as JSON
    final ObjectMapper mapper = new ObjectMapper();
    mapper.writeValue(response.getOutputStream(), body);
  }
}
