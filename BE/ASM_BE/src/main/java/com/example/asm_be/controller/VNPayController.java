package com.example.asm_be.controller;
import com.example.asm_be.configuration.VNpayConfig;
import com.example.asm_be.service.BillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.*;

@RestController
@RequestMapping("/CodeWalkers")
public class VNPayController {
    @Autowired
    BillService billService;

    @GetMapping("createPay")
    public ResponseEntity<?> createPay(@RequestParam int totalPay) throws UnsupportedEncodingException {
        return ResponseEntity.ok().body(billService.paymentVnPay(totalPay));
    }

    @GetMapping("payment/info")
    public ResponseEntity<?> paymemtInfo(@RequestParam(value = "vnp_Amount", required = true) String amount,
                                         @RequestParam(value = "vnp_BankCode", required = true) String bankCode,
                                         @RequestParam(value = "vnp_TransactionStatus", required = true) String OrderInfo) {
        return ResponseEntity.ok(amount+"->"+bankCode+"->"+OrderInfo);
    }
}
