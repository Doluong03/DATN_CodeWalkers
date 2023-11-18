package com.example.asm_be.request;

import com.example.asm_be.entities.Bill;
import com.example.asm_be.entities.BillDetails;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class BillRequest {
    private Integer billId;
    private Date shipDate;
    private String code;
}
