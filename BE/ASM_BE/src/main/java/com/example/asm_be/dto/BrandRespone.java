
package com.example.asm_be.dto;
import com.example.asm_be.entities.Brands;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class BrandRespone {

   private List<Brands> brandsList ;

    private long totalPages;


}
