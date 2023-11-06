
package com.example.asm_be.dto;
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
