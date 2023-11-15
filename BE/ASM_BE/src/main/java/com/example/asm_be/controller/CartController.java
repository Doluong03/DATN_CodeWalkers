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
import java.util.List;
import java.util.Map;
import java.util.Optional;

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
    public ResponseEntity<Collection<CartDetails>> getAllProduct(@RequestParam int idCart) {
        return ResponseEntity.ok(cartDetailService.findByCart(idCart));
    }

    @GetMapping("/api/getSizeBycolor")
    public ResponseEntity<Collection<ProductDetail>> getAllProduct(@RequestParam int idPr ,@RequestParam int idColor ) {
        return ResponseEntity.ok(productDetailService.getPrByColor(idPr, idColor));
    }

    @PutMapping("/api/updateSize/{id}/{idPr}/{idCl}")
    public ResponseEntity<?> updateProductSize(@PathVariable("id") int id,@PathVariable("idPr") int idPr,@PathVariable("idCl") int idCl,@RequestBody Map<String, String> updateData) {
        String newSize = updateData.get("size");
        String cart = updateData.get("idCart");
        cartDetailService.updateProductSize(id, idPr,idCl,newSize,cart);
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
    @DeleteMapping("/api/cart/deleteCart/{cartId}")
    public ResponseEntity<?> delete(@PathVariable("cartId") int cartId){
        if(cartDetailService.deleteByCart( cartId)){
            return ResponseEntity.ok().build();
        }else{
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Lỗi xóa sản phẩm");
        }
    }
    @PutMapping("/api/updateCart")
    public ResponseEntity<?> updateCart(@RequestBody List<CartDetails> listCartDt, @RequestParam int idCart) {
        cartDetailService.updateCart(listCartDt,idCart);
        return ResponseEntity.ok().build();
    }
}
