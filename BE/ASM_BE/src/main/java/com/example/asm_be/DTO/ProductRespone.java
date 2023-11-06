<<<<<<< Updated upstream:BE/ASM_BE/src/main/java/com/example/asm_be/DTO/ProductRespone.java
package com.example.asm_be.DTO;
=======
package com.example.asm_be.dto;
>>>>>>> Stashed changes:BE/ASM_BE/src/main/java/com/example/asm_be/dto/ProductRespone.java

import com.example.asm_be.entities.Product;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductRespone {

    private List<Product> productList;

    private long totalPages;

}
