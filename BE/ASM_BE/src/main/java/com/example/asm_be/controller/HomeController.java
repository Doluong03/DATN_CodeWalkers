package com.example.asm_be.controller;

import com.example.asm_be.entities.ProductDetail;
import com.example.asm_be.service.ProductDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.UUID;

@CrossOrigin("*")
@RestController()
@RequestMapping("/CodeWalkers")
public class HomeController {
    @Autowired
    ProductDetailService productDetailService;

//    @GetMapping("/api/product")
//    public ResponseEntity<Collection<ProductDetail>> getAllProduct(){
//        return ResponseEntity.ok(productDetailService.getAll());
//    }

    @GetMapping("/api/product_bs")
    public ResponseEntity<Collection<ProductDetail>> getProductBestSL(){
        return ResponseEntity.ok(productDetailService.getPrBetsSl());
    }

    @GetMapping("/api/product/{id}")
    public ResponseEntity<ProductDetail> getDetailProduct(@PathVariable("id") int id){
        return ResponseEntity.ok(productDetailService.getOne(id));
    }


}
