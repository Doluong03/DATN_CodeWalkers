package com.example.asm_be.controller;// QRController.java
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class QRController {

    @PostMapping("/scan-qr")
    public String scanQR(@RequestBody String qrCodeData) {
        // Xử lý dữ liệu từ mã QR ở đây
        System.out.println("QR Code Data: " + qrCodeData);
        return "Scanned QR Code: " + qrCodeData;
    }
}
