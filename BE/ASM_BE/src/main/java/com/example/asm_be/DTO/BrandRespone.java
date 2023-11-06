<<<<<<< Updated upstream:BE/ASM_BE/src/main/java/com/example/asm_be/DTO/BrandRespone.java
package com.example.asm_be.DTO;
=======
package com.example.asm_be.dto;
>>>>>>> Stashed changes:BE/ASM_BE/src/main/java/com/example/asm_be/dto/BrandRespone.java

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
