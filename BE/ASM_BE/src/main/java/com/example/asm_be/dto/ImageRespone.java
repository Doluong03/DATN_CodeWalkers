package com.example.asm_be.dto;

import com.example.asm_be.entities.Image;
import com.example.asm_be.entities.Product;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ImageRespone {
    private List<Product> productList;
    private List<Image> imageList;
    private long totalPages;
}
