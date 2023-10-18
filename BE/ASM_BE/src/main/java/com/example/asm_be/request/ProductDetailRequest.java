package com.example.asm_be.request;

import com.example.asm_be.entities.ProductDetail;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ProductDetailRequest {
    private ProductDetail productDetail;
    private String name;
    private Integer quantity;
    private Double price;

}
