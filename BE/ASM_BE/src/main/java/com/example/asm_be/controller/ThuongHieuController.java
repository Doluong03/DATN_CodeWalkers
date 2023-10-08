package com.example.asm_be.controller;


import com.example.asm_be.DTO.BrandRespone;
import com.example.asm_be.entities.Brands;

import com.example.asm_be.entities.ResponeObject;
import com.example.asm_be.entities.Status;
import com.example.asm_be.service.BrandService;
import com.example.asm_be.service.StatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin({"*"})
@RequestMapping({"/CodeWalkers"})
public class ThuongHieuController {

    @Autowired
    private BrandService brandService;

    @Autowired
    private StatusService statusService;

    public ThuongHieuController(){

    }

    @GetMapping({"/admin/Brands"})
    public BrandRespone getAllBrand(@RequestParam(value = "pageNo",defaultValue = "0") Integer pageNo) {
        BrandRespone brandRespone = new BrandRespone();
        Page<Brands> brandsPage = brandService.getAll(pageNo);

        brandRespone.setBrandsList(brandsPage.getContent());
        brandRespone.setTotalPages(brandsPage.getTotalPages());

        return brandRespone;
    }

    @PostMapping({"/admin/Brands/insert"})
    public ResponseEntity<ResponeObject> insertBrand(@RequestBody Brands brands) {
      
        return ResponseEntity.status(HttpStatus.OK).body(new ResponeObject("success", "Add thanh cong", this.brandService.save(brands)));
    }

    @PutMapping({"/admin/Brands/update"})
    public ResponseEntity<ResponeObject> updateBrand(@RequestBody Brands brands) {
        return ResponseEntity.status(HttpStatus.OK).body(new ResponeObject("success", "Update thanh cong", this.brandService.update( brands)));
    }

    @DeleteMapping({"/admin/Brands/delete/{id}"})
    public ResponseEntity<ResponeObject> deleteBrand(@PathVariable("id") Integer idBrand) {
        return ResponseEntity.status(HttpStatus.OK).body(new ResponeObject("success", "Delete thanh cong", this.brandService.delete(idBrand)));
    }
}
