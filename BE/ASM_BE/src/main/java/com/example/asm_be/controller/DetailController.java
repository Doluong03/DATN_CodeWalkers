package com.example.asm_be.controller;

import com.example.asm_be.entities.*;
import com.example.asm_be.service.*;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Map;

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
    @Autowired
    ColorService colorService;
    @Autowired
    UserService userService;

    @GetMapping("/api/detail")
    public ResponseEntity<Collection<CartDetails>> getAllProduct(HttpSession session, HttpServletRequest request, @RequestParam int idCart) {
        return ResponseEntity.ok(cartDetailService.findByCart(idCart));
    }

    @GetMapping("/api/detail/size")
    public ResponseEntity<Collection<Size>> getSize() {
        return ResponseEntity.ok(sizeService.getAll());
    }

    @GetMapping("/api/detail/color")
    public ResponseEntity<Collection<Color>> getColor() {
        return ResponseEntity.ok(colorService.getAll());
    }


    //    @PostMapping("/api/detailAdd/{id_gh}/{id_sp}/{id_size}")
//    public ResponseEntity<CartDetails> addPr(@PathVariable("id_gh") int id_gh, @PathVariable("id_sp") int id_sp,@PathVariable("id_size") int id_size, CartDetails cartDetails,HttpSession session) {
//        Cart cart = (Cart) session.getAttribute("cart");
//        if (cart == null) {
//            cart = new Cart();
//            session.setAttribute("cart", cart);
//        }
//        System.out.println("asgdasdja"+cart.getId());
//        cartDetailService.addOrUpdateCartDetail(cart.getId(), id_sp, id_size,cartDetails);
//        return ResponseEntity.ok().build();
//    }
    @PostMapping("/api/CreateCart")
    public ResponseEntity<Cart> createCart(HttpSession session, HttpServletResponse response) {
        Cart cart = (Cart) session.getAttribute("cart");
        if (cart == null) {
            cart = new Cart();
            cartService.save(cart); // Lưu giỏ hàng vào cơ sở dữ liệu nếu cần
            session.setAttribute("cart", cart);
        }

        // Lưu thông tin giỏ hàng vào Cookies
        Cookie cookie = new Cookie("cartId", String.valueOf(cart.getId()));
        cookie.setMaxAge(3600); // Thời gian sống của Cookie (ví dụ: 1 giờ)
        response.addCookie(cookie);

        return ResponseEntity.ok(cart);
    }

    @PostMapping("/api/UpdateCartByUser/{idUser}")
    public ResponseEntity<Cart> UpdateCartByUser(@PathVariable("idUser") int idUser) {
        Users users = userService.getOne(idUser);
        Cart cart = new Cart();
        cart.setUsers(users);
        cartService.save(cart); // Lưu giỏ hàng vào cơ sở dữ liệu nếu cần
        return ResponseEntity.ok(cart);
    }

    @PostMapping("/api/detailAdd/{id_gh}/{id_sp}/{id_size}/{id_Cl}")
    public ResponseEntity<CartDetails> addPr(
            @PathVariable("id_gh") int id_gh,
            @PathVariable("id_sp") int id_sp,
            @PathVariable("id_size") int id_size,
            @PathVariable("id_Cl") int id_Cl,
            @RequestBody Map<String, Integer> quantity
    ) {
        Cart cart = cartService.getOne(id_gh); // Lấy thông tin giỏ hàng từ cơ sở dữ liệu
        // Tìm sản phẩm
        System.out.println(id_sp + "@@@@@@@@@@" + id_size + "aaaaaaaaaaaaaaaaaaaa");
        ProductDetail productDetailCheck = productDetailService.findBySize(id_sp, id_size, id_Cl);
        Integer newQuantity = quantity.get("quantity");

        // Gọi phương thức dịch vụ để thêm sản phẩm vào giỏ hàng
        cartDetailService.addOrUpdateCartItem(cart, productDetailCheck, newQuantity);

        return ResponseEntity.ok().build();
    }

}
