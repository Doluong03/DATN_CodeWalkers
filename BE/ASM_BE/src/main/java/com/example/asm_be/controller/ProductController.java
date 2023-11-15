package com.example.asm_be.controller;

import com.example.asm_be.entities.*;
import com.example.asm_be.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.List;
@RestController()
@RequestMapping("/CodeWalkers")
public class ProductController {
    @Autowired
    ProductDetailService productDetailService;
    @Autowired
    BrandService brandService;
    @Autowired
    CategoryService categoryService;
    @Autowired
    MaterialService materialService;
    @Autowired
    ColorService colorService;
    @Autowired
    ProductService productService;

    @GetMapping("/api/product")
    public ResponseEntity<Collection<ProductDetail>> getAllProduct() {
        return ResponseEntity.ok(productDetailService.getAll());
    }

    @GetMapping("/api/product/brand")
    public ResponseEntity<Collection<Brands>> getBrand() {
        return ResponseEntity.ok(brandService.getAll());
    }

    @GetMapping("/api/product/category")
    public ResponseEntity<Collection<Category>> getCategory() {
        return ResponseEntity.ok(categoryService.getAll());
    }

    @GetMapping("/api/product/material")
    public ResponseEntity<Collection<Material>> getMaterial() {
        return ResponseEntity.ok(materialService.getAll());
    }

    @GetMapping("/api/product/color")
    public ResponseEntity<Collection<Color>> getColor() {
        return ResponseEntity.ok(colorService.getAll());
    }

    @GetMapping("/api/search/{name}")
    public ResponseEntity<Collection<Product>> findByName(@PathVariable("name") String keyword) {
        return ResponseEntity.ok(productDetailService.findByName(keyword));
    }

    @GetMapping("/api/product/sortName")
    public ResponseEntity<Collection<ProductDetail>> getSortedProducts() {
        return ResponseEntity.ok(productDetailService.getSortedProducts());
    }

    @GetMapping("/api/product/sortPriceA")
    public ResponseEntity<Collection<ProductDetail>> getSortedProducts_priceAsc() {
        return ResponseEntity.ok(productDetailService.getSortedProducts_priceAsc());
    }

    @GetMapping("/api/product/sortPriceD")
    public ResponseEntity<Collection<ProductDetail>> getSortedProducts_priceDesc() {
        return ResponseEntity.ok(productDetailService.getSortedProducts_priceDesc());
    }
}