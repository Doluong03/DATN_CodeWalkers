package com.example.asm_be.dto;


import com.example.asm_be.entities.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductDetailsRespone {
    private List<ProductDetail> productDetailList;
    private List<Size> sizeList;
    private List<Product> productList;
    private List<Material> materialList;
    private List<Color> colorList;
    private List<Promotional> promotionalList;
    private  List<Status> statusList;
    private long totalPages;
}
