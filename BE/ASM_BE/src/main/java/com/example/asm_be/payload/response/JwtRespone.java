package com.example.asm_be.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JwtRespone {
    private String token;
    private List<String> roles;
    private String username;
    private String password;

    public JwtRespone(String jwt, String username, String password, List<String> listRoles) {
    }
}
