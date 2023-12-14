package com.example.asm_be.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VoucherUserDTO {
    private Integer useCount;
    private Integer customType;
    private Integer id;
}
