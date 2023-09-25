//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package com.example.asm_be.controller;

import com.example.asm_be.entities.ResponObject;
import com.example.asm_be.entities.Users;
import com.example.asm_be.service.ProductDetailService;
import com.example.asm_be.service.UserService;
import java.util.List;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin({"*"})
@RestController
@RequestMapping({"/CodeWalkers"})
public class KhachHangController {
    @Autowired
    private ProductDetailService productDetailService;
    @Autowired
    private UserService userService;

    public KhachHangController() {
    }

    @GetMapping({"/api/User"})
    public List<Users> getAllUser() {
        return this.userService.getAll();
    }

    @PostMapping({"/User/insert"})
    public ResponseEntity<ResponObject> insertStaff(@RequestBody Users users) {
        return ResponseEntity.status(HttpStatus.OK).body(new ResponObject("success", "Add thanh cong", this.userService.save(users)));
    }

    @PutMapping({"/User/update/{id}"})
    public ResponseEntity<ResponObject> insertStaff(@RequestBody Users users, @PathVariable("id") UUID idUsers) {
        return ResponseEntity.status(HttpStatus.OK).body(new ResponObject("success", "Update thanh cong", this.userService.update(idUsers, users)));
    }

    @DeleteMapping({"/User/delete/{id}"})
    public ResponseEntity<ResponObject> deleteStaff(@PathVariable("id") UUID idUsers) {
        return ResponseEntity.status(HttpStatus.OK).body(new ResponObject("success", "Delete thanh cong", this.userService.delete(idUsers)));
    }
}
