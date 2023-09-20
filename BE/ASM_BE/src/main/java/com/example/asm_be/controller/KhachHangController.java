package com.example.asm_be.controller;

import com.example.asm_be.entities.ProductDetail;
import com.example.asm_be.entities.ResponObject;
import com.example.asm_be.entities.Staff;
import com.example.asm_be.entities.Users;
import com.example.asm_be.service.ProductDetailService;
import com.example.asm_be.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.List;
import java.util.UUID;

@CrossOrigin("*")
@RestController()
@RequestMapping("/CodeWalkers")
public class KhachHangController {

    @Autowired
    private ProductDetailService productDetailService;

    @Autowired
    private UserService userService;

    @GetMapping("/api/User")
    public List<Users> getAllUser() {
        return userService.getAll();
    }


    @PostMapping("/User/insert")
    public ResponseEntity<ResponObject> insertStaff(@RequestBody Users users) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new ResponObject("success", "Add thanh cong", userService.save(users)));
    }

    @PutMapping("/User/update/{id}")
    public ResponseEntity<ResponObject> insertStaff(@RequestBody Users users,
                                                    @PathVariable("id") UUID idUsers) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new ResponObject("success", "Update thanh cong", userService.update(idUsers, users)));
    }

    @DeleteMapping("/User/delete/{id}")
    public ResponseEntity<ResponObject> deleteStaff(@PathVariable("id") UUID idUsers) {

        return ResponseEntity.status(HttpStatus.OK)
                .body(new ResponObject("success", "Delete thanh cong", userService.delete(idUsers)));
    }


}
