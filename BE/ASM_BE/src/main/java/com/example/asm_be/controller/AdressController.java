package com.example.asm_be.controller;

import com.example.asm_be.cache.DiaChiCache;
import com.example.asm_be.entities.Address;
import com.example.asm_be.entities.Cart;
import com.example.asm_be.entities.Province;
import com.example.asm_be.entities.Users;
import com.example.asm_be.request.AddressRequest;
import com.example.asm_be.request.FeeRequest;
import com.example.asm_be.service.*;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@CrossOrigin({"*"})
@RestController()
@RequestMapping("/CodeWalkers")
public class AdressController {
    @Autowired
    AddressService addressService;
    @Autowired
    UserService userService;
    @Autowired
    BillService billService;
    @Autowired
    CartService cartService;

    @GetMapping({"/get-province"})
    public ResponseEntity<?> getProvince() {
        return ResponseEntity.ok(addressService.fetchProvinces());
    }

    @GetMapping({"/get-district/{provinceId}"})
    public ResponseEntity<?> getDistrict(@PathVariable("provinceId") Integer id) {
        try {
            return ResponseEntity.ok(addressService.fetchDistrict(id));
        } catch (Exception var3) {
            throw new RuntimeException(var3);
        }
    }

    @GetMapping({"/get-Ward/{districtId}"})
    public ResponseEntity<?> getWard(@PathVariable("districtId") Integer id) {
        try {
            return ResponseEntity.ok(addressService.fetchWard(id));
        } catch (Exception var3) {
            throw new RuntimeException(var3);
        }
    }
    public ResponseEntity<?> getPhiVanChuyen(FeeRequest phiVanChuyenRequest) {
        try {
            Integer fee = billService.getFee(phiVanChuyenRequest);
            return ResponseEntity.status(HttpStatus.OK).body(fee);
        } catch (Exception var3) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(var3.getMessage());
        }
    }
    @PostMapping("/save-address")
    public ResponseEntity<?> saveAddress( @RequestBody  @Valid AddressRequest addressRequest ,@RequestParam int idUser,@RequestParam int idCart, BindingResult result) {
        Address address = new Address();
        Optional<Users> users = userService.findByNameandPhone(addressRequest.getUserName(), addressRequest.getPhoneNumber());
        Cart cart = cartService.getOne(idCart);
        try {
            if(result.hasErrors()){
                List<ObjectError> objectError = result.getAllErrors();
                return ResponseEntity.ok(objectError);
            }else{
                if (users.isPresent()) {
                    addressRequest.map(address, users.get());
                    addressService.save(address);
                    cart.setUsers(users.get());
                    cartService.save(cart);
                } else {
                    System.out.println(idUser);
                    Users usersRes = userService.getOne(idUser);
                    usersRes.setName(addressRequest.getUserName());
                    usersRes.setPhoneNumber(addressRequest.getPhoneNumber());
                    usersRes.setEmail(addressRequest.getEmail());
                    userService.save(usersRes);
                    addressRequest.map(address, usersRes);
                    addressService.save(address);
                    cart.setUsers(usersRes);
                    cartService.save(cart);
                }
            }
        } catch (Exception var) {
            var.printStackTrace();
        }
        return ResponseEntity.ok(address);
    }
}
