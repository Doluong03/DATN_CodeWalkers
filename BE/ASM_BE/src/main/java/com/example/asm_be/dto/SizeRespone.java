package com.example.asm_be.dto;

import com.example.asm_be.entities.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SizeRespone {
    private List<Size> sizeList;
    private long totalPages;
}
