package com.example.asm_be.service;

import com.example.asm_be.payload.request.LoginRequest;
import com.example.asm_be.payload.request.SignUpRequest;
import com.example.asm_be.payload.request.userRequest;
import com.example.asm_be.payload.response.JwtRespone;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public interface AuthService {
     ResponseEntity<JwtRespone> Login(LoginRequest account);

     ResponseEntity<?> Register(SignUpRequest singUpRequest);

     ResponseEntity<?> RegisterUser(userRequest userRequest);

     ResponseEntity<JwtRespone> LoginUser(userRequest account);


}
