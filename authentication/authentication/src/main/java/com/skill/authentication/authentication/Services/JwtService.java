package com.skill.authentication.authentication.Services;

import java.util.Date;
import java.util.function.Function;
import javax.crypto.SecretKey;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import com.skill.authentication.authentication.Models.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.Data;

@Service
@Data
public class JwtService {
    private final String SecretKey = "cc9f36ec583c617f0f6c1c1034ebc16c8641f501882a6ab43af24f0c7bcca4e2";
    private long expirationTime = 1000 * 60 * 60 * 24 * 14;

    public SecretKey getSigningKey() {
        byte[] keyBytes = Decoders.BASE64URL.decode(SecretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public <T> T extractClaims(String token, Function<Claims, T> resolver) {
        Claims claims = extractAllClaims(token);
        return resolver.apply(claims);
    }

    public String extractEmpId(String token) {
        return extractClaims(token, Claims::getSubject);
    }

    public boolean isValid(String token, UserDetails user) {
        String empId = extractEmpId(token);
        return (empId.equals(user.getUsername()) && !isTokenExpired(token));
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaims(token, Claims::getExpiration);
    }
    public String extractEmail(String token) {
        return extractClaims(token, claims -> claims.get("Employee Email", String.class));
    }

    public Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public String generateToken(User user) {
        if (!user.isRememberMe()) {
            expirationTime = 1000 * 60 * 60 * 24;
        }
        String token = Jwts.builder()
                .subject(user.getEmpId())
                .claim("Employee First Name", user.getFirstName())
                .claim("Employee Last Name",user.getLastName())
                .claim("Employee Email", user.getEmail())
                .claim("Employee Role", user.getRole())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + expirationTime))
                .signWith(getSigningKey())
                .compact();
        return token;
    }

}
