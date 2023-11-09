package com.example.asm_be.dto;

import com.example.asm_be.entities.Category;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoryRespone {
    private List<Category> categoryList;
    private long categoryPages;
}
