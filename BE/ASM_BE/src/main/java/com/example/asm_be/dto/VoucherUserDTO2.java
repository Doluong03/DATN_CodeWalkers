package com.example.asm_be.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VoucherUserDTO2 {
     private Integer idUser;
     private Integer usageCount;
     private Integer quantity;
}
