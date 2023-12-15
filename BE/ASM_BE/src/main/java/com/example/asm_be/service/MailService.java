package com.example.asm_be.service;

import com.example.asm_be.payload.request.LoginRequest;
import com.example.asm_be.payload.request.SignUpRequest;
import com.example.asm_be.payload.request.userRequest;
import com.example.asm_be.payload.request.userSignUpRequest;
import com.example.asm_be.payload.response.JwtRespone;
import org.springframework.core.io.InputStreamSource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public interface MailService {
     public void sendOtp(String to, String otp);
     public void sendEmailWithPdf(String to, MultipartFile pdfFile, String textContent);
}
