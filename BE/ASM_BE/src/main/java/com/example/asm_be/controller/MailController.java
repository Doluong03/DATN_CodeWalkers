package com.example.asm_be.controller;

import com.example.asm_be.entities.BillDetails;
import com.example.asm_be.service.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collection;

@RestController
@RequestMapping({"/CodeWalkers"})
public class MailController {

    @Autowired
    private MailService emailService;

    @PostMapping("/send-with-pdf")
    public String sendEmailWithPdf(
            @RequestParam String email,
            @RequestParam MultipartFile pdfFile,
            @RequestParam String textContent
    ) {

        emailService.sendEmailWithPdf(email, pdfFile, textContent);
        return "Email sent successfully!";
    }

    @GetMapping("/send-email-ResetPw")
    public String getAllBillDt(@RequestParam String mail) {
        // Generate a random 6-digit OTP
        String otp = generateRandomOtp(6);
        // Send OTP via email
        emailService.sendOtp(mail, otp);
        return "OTP sent successfully!";
    }
    private String generateRandomOtp(int length) {
        StringBuilder otp = new StringBuilder();
        for (int i = 0; i < length; i++) {
            otp.append((int) (Math.random() * 10));
        }
        return otp.toString();
    }

}
