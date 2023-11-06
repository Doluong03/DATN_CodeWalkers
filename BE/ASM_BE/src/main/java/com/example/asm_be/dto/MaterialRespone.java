package com.example.asm_be.dto;

import com.example.asm_be.entities.Material;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MaterialRespone {
    private List<Material> materialList;
    private long totalPages;

}
