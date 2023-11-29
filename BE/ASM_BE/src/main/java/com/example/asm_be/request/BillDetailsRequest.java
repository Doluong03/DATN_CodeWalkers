package com.example.asm_be.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class BillDetailsRequest {
    int prDetailId;
    int quantity;
    double price;
    int idBill;
}
