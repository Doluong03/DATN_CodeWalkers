package com.example.asm_be.controller;

import com.example.asm_be.entities.*;
import com.example.asm_be.service.CartDetailService;
import com.example.asm_be.service.CartService;
import com.example.asm_be.service.ProductDetailService;
import com.example.asm_be.service.SizeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Map;
import java.util.Optional;

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

    @PutMapping("/api/updateSize/{id}/{idPr}")
    public ResponseEntity<?> updateProductSize(@PathVariable("id") int id,@PathVariable("idPr") int idPr,@RequestBody Map<String, String> updateData) {
        String newSize = updateData.get("size");
        cartDetailService.updateProductSize(id, idPr, newSize);
        return ResponseEntity.ok().build();
    }
    @PutMapping("/api/updateQuantity/{productId}")
    public ResponseEntity<?> updateProductQuantity(@PathVariable("productId") int productId, @RequestBody Map<String, Integer> updateData) {
        Integer newQuantity = updateData.get("quantity");
        try {
            // Gọi phương thức dịch vụ để cập nhật số lượng cho sản phẩm
            cartDetailService.updateProductQuantity(productId, newQuantity);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Lỗi cập nhật số lượng sản phẩm");
        }
    }
    @DeleteMapping("/api/cart/delete/{productId}/{cartId}")
    public ResponseEntity<?> delete(@PathVariable("productId") int productId,@PathVariable("cartId") int cartId){
        if(cartDetailService.delete(productId, cartId)){
            return ResponseEntity.ok().build();
        }else{
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Lỗi xóa sản phẩm");
        }
    }
}
