package com.example.asm_be.dto;

import com.example.asm_be.entities.Vouchers;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VoucherRespone {

    private List<Vouchers> vouchersList;
    private long totalPages;


}
