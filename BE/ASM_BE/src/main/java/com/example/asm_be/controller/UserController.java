//package com.example.asm_be.controller;
//
//import com.example.asm_be.entities.Account;
//import jakarta.servlet.http.HttpServletRequest;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import java.security.Principal;
//import java.util.Base64;
//
//@RestController
//@CrossOrigin
//public class UserController {
//    @RequestMapping("/login")
//    public boolean login(@RequestBody Account account) {
//        return account.getUserName().equals("user") && account.getPassword().equals("password");
//    }
//
//    @RequestMapping("/user")
//    public Principal user(HttpServletRequest request) {
//        String authToken = request.getHeader("Authorization")
//                .substring("Basic".length()).trim();
//        return () -> new String(Base64.getDecoder()
//                .decode(authToken)).split(":")[0];
//    }
//}
//
