package com.example.asm_be.dto;

import com.example.asm_be.entities.ProductDetail;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ProductFilterDTO {
    private Double minPrice;
    private Double maxPrice;
    private List<Integer> brands;
    private List<Integer> sizes;
    private List<Integer> colors;
    private List<Integer> materials;
    private List<Integer> categories;
}
