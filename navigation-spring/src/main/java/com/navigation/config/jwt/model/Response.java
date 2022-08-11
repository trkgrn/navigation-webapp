package com.navigation.config.jwt.model;

import com.navigation.entity.concretes.Role;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Response {
    private String token;
    private Role role;
}
