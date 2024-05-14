package com.skill.authentication.authentication.Models;

import java.sql.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@Entity
@NoArgsConstructor
public class BlackList {
    @Id
    private Long id;
    private String token;
    private Date expireTime;
}
