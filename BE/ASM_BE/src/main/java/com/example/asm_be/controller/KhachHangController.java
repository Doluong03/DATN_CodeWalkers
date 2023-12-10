
package com.example.asm_be.controller;

import com.example.asm_be.dto.UserRespone;
import com.example.asm_be.entities.ResponeObject;
import com.example.asm_be.entities.Users;
//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

import com.example.asm_be.request.UserRequest;
import com.example.asm_be.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@RestController
@RequestMapping({"/CodeWalkers"})
public class KhachHangController {

    @Autowired
    private UserService userService;
    public KhachHangController() {
    }

    @GetMapping({"/User"})
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_EMPLOYEE') ")
    public UserRespone getAllUser(
            @RequestParam(value = "pageNo", defaultValue = "1") Integer pageNo,
            @RequestParam(value = "sizePage", defaultValue = "5") Integer sizePage) {
        UserRespone userRespone = new UserRespone();
        Page<Users> usersPage = userService.getAll(pageNo-1, sizePage);

        userRespone.setUsersList(usersPage.getContent());
        userRespone.setTotalPages(usersPage.getTotalPages());

        return userRespone;
    }

    @PostMapping({"/admin/User/insert"})
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_EMPLOYEE') ")
    public ResponseEntity<ResponeObject> insertStaff(@RequestBody Users users) throws ParseException {
        users.setCreatedDate(new Date());
        users.setStatus(true);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ResponeObject("success", "Add thanh cong", userService.save(users)));
    }

    @PutMapping({"/admin/User/update"})
    public ResponseEntity<ResponeObject> UpdateStaff(@RequestBody UserRequest users) throws ParseException {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ResponeObject("success", "Update thanh cong", this.userService.update(users)));
    }

    @DeleteMapping({"/admin/User/delete/{id}"})
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<ResponeObject> deleteStaff(@PathVariable("id") Integer idUsers) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ResponeObject("success", "Delete thanh cong", this.userService.delete(idUsers)));
    }

    @GetMapping({"/profile/{username}"})
    public Users getProfile(@PathVariable("username") String  username) {
          Optional<Users> optionalUsers = userService.findByUserName(username);
          return optionalUsers.get();
    }
    @PostMapping({"/getdata/{username}"})
    public Users getdata(@PathVariable("username") String  username , @RequestBody Map<String, String>  response) {
          String passwordRes = response.get("password");
          Optional<Users> optionalUsers = userService.findByAcc(username,passwordRes);
          return optionalUsers.get();
    }

    @GetMapping("/user/getAll")
    public ResponseEntity<Collection<Users>> getAllUser(){
        return ResponseEntity.ok(userService.getAllUser());
    }
    @GetMapping("/user/getUserOld")
    public ResponseEntity<Collection<Users>> getUserOld(){
        return ResponseEntity.ok(userService.getUserOld());
    }
    @GetMapping("/user/getUserNew")
    public ResponseEntity<Collection<Users>> getUserNew(){
        return ResponseEntity.ok(userService.getUserNew());
    }
}
