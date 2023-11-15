package com.example.asm_be.controller;

import com.example.asm_be.entities.Product;
import com.example.asm_be.entities.ProductDetail;
import com.example.asm_be.service.ProductDetailService;
import com.example.asm_be.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.UUID;
@RestController()
@RequestMapping("/CodeWalkers")
public class HomeController {
    @Autowired
    ProductDetailService productDetailService;
    @Autowired
    ProductService productService;

//    @GetMapping("/api/product")
//    public ResponseEntity<Collection<ProductDetail>> getAllProduct(){
//        return ResponseEntity.ok(productDetailService.getAll());
//    }

//    @GetMapping("/api/product_bs")
//    public ResponseEntity<Collection<ProductDetail>> getProductBestSL() {
//        return ResponseEntity.ok(productDetailService.getPrBetsSl());
//    }

//    @GetMapping("/api/product/{id}")
//    public ResponseEntity<ProductDetail> getDetailProduct(@PathVariable("id") int id) {
//        return ResponseEntity.ok(productDetailService.getOne(id));
//    }

    @GetMapping("/api/product/{id}")
    public ResponseEntity<Collection<ProductDetail>> getProduct(@PathVariable("id") int id) {
        return ResponseEntity.ok(productDetailService.findByPrId(id));
    }

    @GetMapping("/api/product_bs")
    public ResponseEntity<Collection<ProductDetail>> getAllProduct() {
        return ResponseEntity.ok(productDetailService.getAll());
    }


}
