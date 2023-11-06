package com.example.asm_be.payload.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class JwtRespone {
    private String token;
    private String type="Bearer";
    private List<String> roles;
    private String username;
    private String password;
    private String role;

    public JwtRespone(String token,List<String> roles, String username, String password) {
        this.token = token;
        this.roles = roles;
        this.username = username;
        this.password = password;
    }

    public JwtRespone(String token, String username, String password, String role) {
        this.token = token;
        this.username = username;
        this.password = password;
        this.role = role;
    }
}
