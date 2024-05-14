package com.skill.authentication.authentication.Services;

import java.sql.Date;

import org.springframework.stereotype.Service;

import com.skill.authentication.authentication.Models.BlackList;
import com.skill.authentication.authentication.Repository.BlackListRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class BlackListService {
    private final BlackListRepository blacklistRepository;

    public void addToBlacklist(String token, Date expirationTime) {
        BlackList entry = new BlackList();
        entry.setToken(token);
        entry.setExpireTime(expirationTime);
        blacklistRepository.save(entry);
    }

    public boolean isBlacklisted(String token) {
        return blacklistRepository.findByToken(token).isPresent();
    }

    public void deleteExpiredToken(String token) {
        if (isBlacklisted(token)) {
            blacklistRepository.deleteByToken(token);
        }
    }
}