package com.example.asm_be.service.impl;

import com.example.asm_be.service.MailService;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.InputStreamSource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Component
public class MailImpl implements MailService {
    @Autowired
    private JavaMailSender javaMailSender;

    public void sendEmailWithPdf(String to, MultipartFile pdfFile, String textContent) {
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setTo(to);
            String subject = "Hóa đơn điện tử CodeWalkers";
            helper.setSubject(subject);
            String content = "Chào " + textContent + " Chúng tôi xin cảm ơn bạn đã mua sắm tại cửa hàng của chúng tôi. Dưới đây là thông tin về hóa đơn của bạn:";
            // Đọc dữ liệu từ MultipartFile và thêm PDF vào email
            helper.addAttachment("Invoice.pdf", pdfFile);

            // Set nội dung của email
            helper.setText(content, true);

            javaMailSender.send(message);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void sendOtp(String to, String otp) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Your OTP Code");
        message.setText("Your OTP code is: " + otp);

        javaMailSender.send(message);
    }
}
