package com.example.asm_be.controller;


import com.example.asm_be.dto.BrandRespone;
import com.example.asm_be.entities.Brands;
import com.example.asm_be.entities.ResponeObject;
import com.example.asm_be.service.BrandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;


@RestController
@RequestMapping({"/CodeWalkers"})
public class ThuongHieuController {

    @Autowired
    private BrandService brandService;

    public ThuongHieuController(){

    }

    @GetMapping({"/Brands"})
    public BrandRespone getAllBrands(
            @RequestParam(value = "pageNo", defaultValue = "0") Integer pageNo,
            @RequestParam(value = "sizePage", defaultValue = "5") Integer sizePage) {
        BrandRespone brandRespone = new BrandRespone();
        Page<Brands> brandsPage = brandService.getAllPage(pageNo, sizePage);

        brandRespone.setBrandsList(brandsPage.getContent());
        brandRespone.setTotalPages(brandsPage.getTotalPages());

        return brandRespone;
    }
    @PostMapping({"/admin/Brands/insert"})
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<ResponeObject> insertBrands(@RequestBody Brands brands) throws ParseException {


        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ResponeObject("success", "Add thanh cong", brandService.save(brands)));
    }

    @PutMapping({"/admin/Brands/update"})
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<ResponeObject> UpdateBrands(@RequestBody Brands brands) throws ParseException {


        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ResponeObject("success", "Update thanh cong", this.brandService.update(brands)));
    }

    @DeleteMapping({"/admin/Brands/delete/{id}"})
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<ResponeObject> deleteBrands(@PathVariable("id") Integer idBrands) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ResponeObject("success", "Delete thanh cong", this.brandService.delete(idBrands)));

    }


}
