package com.example.asm_be.dto;



import com.example.asm_be.entities.Color;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ColorRespone {

    private List<Color> colorList ;

    private long totalPages;
}
