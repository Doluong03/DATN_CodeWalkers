package com.example.asm_be.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SerachPromotionRequest {
    private Integer status;
    private String name;
    private String type;
    private Date  date;
}
