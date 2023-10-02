package com.example.asm_be.controller;

import com.example.asm_be.entities.*;
import com.example.asm_be.service.CartDetailService;
import com.example.asm_be.service.CartService;
import com.example.asm_be.service.ProductDetailService;
import com.example.asm_be.service.SizeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@CrossOrigin("*")
@RestController()
@RequestMapping("/CodeWalkers")
public class DetailController {
    @Autowired
    CartDetailService cartDetailService;
    @Autowired
    CartService cartService;
    @Autowired
    ProductDetailService productDetailService;
    @Autowired
    SizeService sizeService;


    @GetMapping("/api/detail")
    public ResponseEntity<Collection<CartDetails>> getAllProduct() {
        return ResponseEntity.ok(cartDetailService.getAll());
    }
    @GetMapping("/api/detail/size")
    public ResponseEntity<Collection<Size>> getSize() {
        return ResponseEntity.ok(sizeService.getAll());
    }

    @PostMapping("/api/CreateCart")
    public ResponseEntity<?> CreateCart() {
        return ResponseEntity.ok(cartService.save(new Cart()));
    }

    @PostMapping("/api/detailAdd/{id_gh}&&{id_sp}")
    public ResponseEntity<CartDetails> addPr(@PathVariable("id_gh") int id_gh, @PathVariable("id_sp") int id_sp, CartDetails cartDetails) {
        CartDetailsId cartDetailsId = new CartDetailsId();
        cartDetailsId.setProductDetail(productDetailService.getOne(id_sp));
        cartDetailsId.setCart(cartService.getOne(id_gh));
        cartDetails.setId(cartDetailsId);
        return ResponseEntity.ok(cartDetailService.save(cartDetails));
    }

}