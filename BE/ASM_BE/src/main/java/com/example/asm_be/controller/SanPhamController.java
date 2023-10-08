package com.example.asm_be.controller;

import com.example.asm_be.DTO.BrandRespone;
import com.example.asm_be.DTO.ProductRespone;
import com.example.asm_be.entities.Brands;
import com.example.asm_be.entities.Product;
import com.example.asm_be.entities.ResponeObject;
import com.example.asm_be.entities.Status;

import com.example.asm_be.service.ProductService;
import com.example.asm_be.service.StatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

@RestController
@CrossOrigin({"*"})
@RequestMapping({"/CodeWalkers"})
public class SanPhamController {
    @Autowired
    private ProductService productService;

    @Autowired
    private StatusService statusService;

    public SanPhamController(){

    }

    @GetMapping({"/admin/Product"})
    public ProductRespone getAllProduct(@RequestParam(value = "pageNo",defaultValue = "0") Integer pageNo) {
        ProductRespone productRespone = new ProductRespone();
        Page<Product> productPage = productService.getAll(pageNo);

        productRespone.setProductList(productPage.getContent());
        productRespone.setTotalPages(productPage.getTotalPages());

        return productRespone;
    }

    @PostMapping({"/admin/Product/insert"})
    public ResponseEntity<ResponeObject> insertProduct(@RequestBody Product product) {
        return ResponseEntity.status(HttpStatus.OK).body(new ResponeObject("success", "Add thanh cong", this.productService.save(product)));
    }

    @PutMapping({"/admin/Product/update"})
    public ResponseEntity<ResponeObject> insertProduct(@RequestBody Product product, @PathVariable("id") Integer idProduct) {

        return ResponseEntity.status(HttpStatus.OK).body(new ResponeObject("success", "Update thanh cong", this.productService.update(idProduct, product)));
    }

    @DeleteMapping({"/admin/Product/delete/{id}"})
    public ResponseEntity<ResponeObject> deleteProduct(@PathVariable("id") Integer idProduct) {
        return ResponseEntity.status(HttpStatus.OK).body(new ResponeObject("success", "Delete thanh cong", this.productService.delete(idProduct)));
    }
}
