package com.example.asm_be.controller;

import com.example.asm_be.cache.DiaChiCache;
import com.example.asm_be.entities.Province;
import com.example.asm_be.service.AddressService;
import com.example.asm_be.service.ProvinceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@CrossOrigin("*")
@RestController()
@RequestMapping("/CodeWalkers")
public class AdressController {
    @Autowired
    AddressService addressService;

    @GetMapping({"/get-province"})
    public ResponseEntity<?> getProvince() {
        return ResponseEntity.ok(addressService.fetchProvinces());
    }
    @GetMapping({"/get-district/{provinceId}"})
    public ResponseEntity<HashMap<Integer, String>> getDistrict(@PathVariable("provinceId") Integer id) {
        try {
            return ResponseEntity.ok(addressService.fetchDistrict(id));
        } catch (Exception var3) {
            throw new RuntimeException(var3);
        }
    }
    @GetMapping({"/get-Ward/{districtId}"})
    public ResponseEntity<HashMap<String, String>> getWard(@PathVariable("districtId") Integer id) {
        try {
            return ResponseEntity.ok(addressService.fetchWard(id));
        } catch (Exception var3) {
            throw new RuntimeException(var3);
        }
    }
}
