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
import java.util.Map;

@CrossOrigin("*")
@RestController()
@RequestMapping("/CodeWalkers")
public class CartController {
    @Autowired
    CartDetailService cartDetailService;
    @Autowired
    CartService cartService;
    @Autowired
    ProductDetailService productDetailService;
    @Autowired
    SizeService sizeService;


    @GetMapping("/api/cart")
    public ResponseEntity<Collection<CartDetails>> getAllProduct() {
        return ResponseEntity.ok(cartDetailService.getAll());
    }

    @PostMapping("/api/updateSize")
    public ResponseEntity<String> updateSize(@RequestBody Map<String, String> payload) {
        String newSizeName = payload.get("newSize");
        int idPr = Integer.valueOf(payload.get("productId"));
        ProductDetail outPr = productDetailService.getOne(idPr);
        Size outSize = sizeService.findByName(newSizeName);
        outPr.setSize(outSize);
        // Thực hiện cập nhật kích thước trong cơ sở dữ liệu tại đây
        return ResponseEntity.ok("Kích thước đã được cập nhật thành công");
    }
}
