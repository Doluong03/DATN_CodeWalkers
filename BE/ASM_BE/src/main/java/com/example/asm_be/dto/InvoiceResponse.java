package com.example.asm_be.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InvoiceResponse {

     Map<String,List<Integer>> listInvoice;
}
