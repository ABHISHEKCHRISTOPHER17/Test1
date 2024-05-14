package com.skill.authentication.authentication.Models;

import lombok.Data;

@Data
public class ResetPassword {
    private String password;
    private String token;
}
