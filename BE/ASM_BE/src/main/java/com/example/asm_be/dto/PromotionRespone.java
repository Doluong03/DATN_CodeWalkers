package com.example.asm_be.dto;

import com.example.asm_be.entities.Promotional;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PromotionRespone {
     private List<Promotional> promotionalList;
     private long totalPages;

}
