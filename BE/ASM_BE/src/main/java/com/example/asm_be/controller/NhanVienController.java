package com.example.asm_be.controller;

import com.example.asm_be.entities.ProductDetail;
import com.example.asm_be.entities.ResponObject;
import com.example.asm_be.entities.Staff;
import com.example.asm_be.service.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin("*")
@RequestMapping("/CodeWalkers/admin")
public class NhanVienController {

    @Autowired
    private StaffService staffService;

    @GetMapping("/Staff")
    public List<Staff> getAllProduct(@RequestParam(value = "pageNo",defaultValue = "0") Integer pageNo){
        Page<Staff> staffPage = staffService.getAll(pageNo);
        List<Staff> staffList = staffPage.getContent();
        return staffList;

    }

    @PostMapping("/Staff/insert")
    public ResponseEntity<ResponObject> insertStaff(@RequestBody Staff staff){
        return ResponseEntity.status(HttpStatus.OK)
                .body(new ResponObject("success","Add thanh cong",staffService.save(staff)));
    }

    @PutMapping("/Staff/update/{id}")
    public ResponseEntity<ResponObject> insertStaff(@RequestBody Staff staff,
                                                    @PathVariable("id")UUID idStaff)
    {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new ResponObject("success","Update thanh cong",staffService.update(idStaff,staff)));
    }

    @DeleteMapping("/Staff/delete/{id}")
    public ResponseEntity<ResponObject> deleteStaff(@PathVariable("id")UUID idStaff)
    {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new ResponObject("success","Delete thanh cong",staffService.delete(idStaff)));
    }

}
