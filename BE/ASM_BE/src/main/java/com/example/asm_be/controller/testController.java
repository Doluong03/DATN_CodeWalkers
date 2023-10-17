package com.example.asm_be.controller;

import com.example.asm_be.payload.request.LoginRequest;
import com.example.asm_be.payload.request.SignUpRequest;
import com.example.asm_be.payload.request.userRequest;
import com.example.asm_be.payload.response.JwtRespone;
import com.example.asm_be.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin({"*"})
@RequestMapping({"/api/auth"})
public class testController {
    @Autowired
    private AuthService authService;

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
}
