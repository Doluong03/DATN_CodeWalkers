package com.example.asm_be.dto;

import com.example.asm_be.entities.Bill;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BillRespone {
    private List<Bill> billList;
    private long totalPages;
}
