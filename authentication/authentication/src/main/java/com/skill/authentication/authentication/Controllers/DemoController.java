package com.skill.authentication.authentication.Controllers;

import java.util.List;
import java.util.Map;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
public class DemoController {

    private final RestTemplate restTemplate;
    private final String skill_reference_url = "http://skill-reference-service";

    @GetMapping("/hello")
    public String helloWorld() {
        return "Hello, World!";
    }

    @PostMapping("/enable-skill-capture")
    public ResponseEntity<String> enableSkillCapture(@RequestBody Map<String, String> requestParams) {
        try {
            // Forward the request to the other service using service discovery
            ResponseEntity<String> responseEntity = restTemplate
                    .postForEntity("http://172.18.4.225:1337/enable-skill-capture", requestParams, String.class);
            return ResponseEntity.status(responseEntity.getStatusCode()).body(responseEntity.getBody());
        } catch (RestClientException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while forwarding the request: " + e.getMessage());
        }
    }

    @GetMapping("/views")
    public ResponseEntity<?> getAllSkillsOrdered() {
        try {
            List<Map<String, Object>> skills = restTemplate.exchange(
                    skill_reference_url + "/api/skills/views",
                    HttpMethod.GET,
                    null,
                    new ParameterizedTypeReference<List<Map<String, Object>>>() {
                    }).getBody();
            return ResponseEntity.ok(skills);
        } catch (RestClientException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occured while sending your request");
        }
    }

}
