package com.example.asm_be.dto;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class PaymentResDto implements Serializable {
    private String status;
    private String message;
    private String URL;
}
