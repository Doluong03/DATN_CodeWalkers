package com.example.asm_be.controller;


<<<<<<< Updated upstream
import com.example.asm_be.DTO.BrandRespone;
import com.example.asm_be.entities.Brands;

import com.example.asm_be.entities.ResponeObject;
import com.example.asm_be.entities.Status;
import com.example.asm_be.service.BrandService;
import com.example.asm_be.service.StatusService;
=======

import com.example.asm_be.dto.BrandRespone;
import com.example.asm_be.dto.UserRespone;
import com.example.asm_be.entities.Brands;
import com.example.asm_be.entities.ResponeObject;
import com.example.asm_be.entities.Users;
import com.example.asm_be.service.BrandService;

>>>>>>> Stashed changes
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
<<<<<<< Updated upstream
=======
import org.springframework.security.access.prepost.PreAuthorize;
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
=======
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

>>>>>>> Stashed changes
@RestController
@CrossOrigin({"*"})
@RequestMapping({"/CodeWalkers"})
public class ThuongHieuController {

    @Autowired
    private BrandService brandService;

<<<<<<< Updated upstream
    @Autowired
    private StatusService statusService;
=======
>>>>>>> Stashed changes

    public ThuongHieuController(){

    }

<<<<<<< Updated upstream
    @GetMapping({"/admin/Brands"})
    public BrandRespone getAllBrand(@RequestParam(value = "pageNo",defaultValue = "0") Integer pageNo) {
        BrandRespone brandRespone = new BrandRespone();
        Page<Brands> brandsPage = brandService.getAll(pageNo);
=======
    @GetMapping({"/Brands"})
    public BrandRespone getAllBrands(
            @RequestParam(value = "pageNo", defaultValue = "0") Integer pageNo,
            @RequestParam(value = "sizePage", defaultValue = "5") Integer sizePage) {
        BrandRespone brandRespone = new BrandRespone();
        Page<Brands> brandsPage = brandService.getAll(pageNo, sizePage);
>>>>>>> Stashed changes

        brandRespone.setBrandsList(brandsPage.getContent());
        brandRespone.setTotalPages(brandsPage.getTotalPages());

        return brandRespone;
    }

    @PostMapping({"/admin/Brands/insert"})
<<<<<<< Updated upstream
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
=======
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


>>>>>>> Stashed changes
}
