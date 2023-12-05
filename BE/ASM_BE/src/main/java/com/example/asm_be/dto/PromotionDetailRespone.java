package com.example.asm_be.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PromotionDetailRespone {
      private int idProductDetail;

      private String nameProduct;

      private double price;

      private double reducePrice;

      private int colorId;

      private  int sizeId;




}
