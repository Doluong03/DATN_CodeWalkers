package com.example.asm_be.controller;

import com.example.asm_be.payload.request.LoginRequest;
import com.example.asm_be.payload.request.SignUpRequest;
import com.example.asm_be.payload.request.userRequest;
import com.example.asm_be.payload.response.JwtRespone;
import com.example.asm_be.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Set;

@RestController
@RequestMapping({"/api/auth"})
public class LoginController {
    @Autowired
    private AuthService authService;

    private Set<String> tokenBlacklist = new HashSet<>();


    @PostMapping("/signUp")
    public ResponseEntity<?> Resgiter(@RequestBody SignUpRequest singUpRequest){
        return authService.Register(singUpRequest);
    }
    @PostMapping("/login")
    public ResponseEntity<JwtRespone> authenticate(@RequestBody LoginRequest account){
        return authService.Login(account);
    }

    @PostMapping("/signUpUser")
    public ResponseEntity<?> ResgiterUser(@RequestBody userRequest userRequest){
        return authService.RegisterUser(userRequest);
    }

    @PostMapping("/loginUser")
    public ResponseEntity<JwtRespone> authenticate2(@RequestBody userRequest account){
        System.out.println(account);
        return authService.LoginUser(account);
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(@RequestHeader("Authorization") String token) {
        // Extract the token from the Authorization header
        String extractedToken = extractToken(token);

        // Invalidate the token on the server side (add it to the blacklist)
        tokenBlacklist.add(extractedToken);

        // You can also perform additional cleanup tasks here

        return ResponseEntity.ok("Logout successful");
    }

    private String extractToken(String authorizationHeader) {
        // Extract the token from the "Bearer" token format
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            return authorizationHeader.substring(7);
        }
        return null;
    }
}
