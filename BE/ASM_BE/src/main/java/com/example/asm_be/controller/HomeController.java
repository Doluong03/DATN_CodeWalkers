package com.example.asm_be.controller;

import com.example.asm_be.entities.ProductDetail;
import com.example.asm_be.service.ProductDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;
@CrossOrigin("*")
@RestController()
@RequestMapping("/CodeWalkers")
public class HomeController {
    @Autowired
    ProductDetailService productDetailService;

    @GetMapping("/api/product")
    public ResponseEntity<Collection<ProductDetail>> getAllProduct(){
        return ResponseEntity.ok(productDetailService.getAll());
    }



}
