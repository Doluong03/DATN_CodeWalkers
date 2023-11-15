package com.example.asm_be.controller;


import com.example.asm_be.dto.BrandRespone;
import com.example.asm_be.dto.ColorRespone;
import com.example.asm_be.entities.Brands;
import com.example.asm_be.entities.Color;
import com.example.asm_be.entities.ResponeObject;
import com.example.asm_be.service.BrandService;
import com.example.asm_be.service.ColorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;

@RestController
@RequestMapping({"/CodeWalkers"})
public class MauSacController {

    @Autowired
    private ColorService colorService;


    public MauSacController(){

    }

    @GetMapping({"/Color"})
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ColorRespone getAllColor(
            @RequestParam(value = "pageNo", defaultValue = "0") Integer pageNo,
            @RequestParam(value = "sizePage", defaultValue = "5") Integer sizePage) {
        ColorRespone colorRespone = new ColorRespone();
        Page<Color> colorPage = colorService.getAllPage(pageNo, sizePage);

        colorRespone.setColorList(colorPage.getContent());
        colorRespone.setTotalPages(colorPage.getTotalPages());

        return colorRespone;
    }

    @PostMapping({"/admin/Color/insert"})
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<ResponeObject> insertColor(@RequestBody Color color) throws ParseException {


        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ResponeObject("success", "Add thanh cong", colorService.save(color)));
    }

    @PutMapping({"/admin/Color/update"})
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<ResponeObject> UpdateColor(@RequestBody Color color) throws ParseException {


        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ResponeObject("success", "Update thanh cong", this.colorService.update(color)));
    }

    @DeleteMapping({"/admin/Color/delete/{id}"})
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<ResponeObject> deleteColor(@PathVariable("id") Integer idColor) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ResponeObject("success", "Delete thanh cong", this.colorService.delete(idColor)));

    }


}
