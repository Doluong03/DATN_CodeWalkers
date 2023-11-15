package com.example.asm_be.controller;

import com.example.asm_be.dto.BrandRespone;
import com.example.asm_be.entities.Product;
import com.example.asm_be.entities.ResponeObject;

import com.example.asm_be.service.ProductService;
import com.example.asm_be.service.StatusService;
import com.example.asm_be.dto.ProductRespone;
import com.example.asm_be.entities.Category;
import com.example.asm_be.service.BrandService;
import com.example.asm_be.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Collection;
import java.util.Date;
import java.util.Locale;

@RestController
@RequestMapping({"/CodeWalkers"})
public class SanPhamController {

    @Autowired
    private BrandService brandService;

    @Autowired
    private ProductService productService;

    public SanPhamController() {
    }

    @GetMapping({"/Product"})
    public ProductRespone getAllProduct(
            @RequestParam(value = "pageNo", defaultValue = "0") Integer pageNo,
            @RequestParam(value = "sizePage", defaultValue = "5") Integer sizePage) {
        ProductRespone productRespone = new ProductRespone();
        Page<Product> productPage = productService.getAllPage(pageNo, sizePage);
        productRespone.setProductList(productPage.getContent());
        productRespone.setTotalPages(productPage.getTotalPages());

        return productRespone;
    }


    @PostMapping({"/admin/Product/insert"})
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<ResponeObject> insertProduct(@RequestBody Product product) throws ParseException {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ResponeObject("success", "Add thanh cong", productService.save(product)));
    }

    @PutMapping({"/admin/Product/update"})
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<ResponeObject> UpdateProduct(@RequestBody Product product) throws ParseException {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ResponeObject("success", "Update thanh cong", this.productService.update(product)));
    }

    @DeleteMapping({"/admin/Product/delete/{id}"})
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<ResponeObject> deleteProduct(@PathVariable("id") Integer idProduct) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ResponeObject("success", "Delete thanh cong", this.productService.delete(idProduct)));

    }

}
