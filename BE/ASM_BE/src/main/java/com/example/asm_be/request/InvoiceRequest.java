package com.example.asm_be.request;

import com.example.asm_be.entities.BillDetails;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class InvoiceRequest {
    String code;
    String userName;
    Date purchaseDate;
    String address;
    Float feeShip;
    Float totalPay;
    String methodPay;
    List<BillDetails> billDetails;
}
