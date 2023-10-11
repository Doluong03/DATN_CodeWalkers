package com.example.asm_be.dto;

import com.example.asm_be.entities.Manufacture;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ManufactureRespone {

    private List<Manufacture> manufactureList;
    private long totalPages;
}
