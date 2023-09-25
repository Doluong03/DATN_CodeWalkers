//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package com.example.asm_be.controller;

import com.example.asm_be.entities.ResponObject;
import com.example.asm_be.entities.Staff;
import com.example.asm_be.service.StaffService;
import java.util.List;
import java.util.UUID;
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
@RequestMapping({"/CodeWalkers/admin"})
public class NhanVienController {
    @Autowired
    private StaffService staffService;

    public NhanVienController() {
    }

    @GetMapping({"/Staff"})
    public List<Staff> getAllProduct(@RequestParam(value = "pageNo",defaultValue = "0") Integer pageNo) {
        Page<Staff> staffPage = this.staffService.getAll(pageNo);
        List<Staff> staffList = staffPage.getContent();
        return staffList;
    }

    @PostMapping({"/Staff/insert"})
    public ResponseEntity<ResponObject> insertStaff(@RequestBody Staff staff) {
        return ResponseEntity.status(HttpStatus.OK).body(new ResponObject("success", "Add thanh cong", this.staffService.save(staff)));
    }

    @PutMapping({"/Staff/update/{id}"})
    public ResponseEntity<ResponObject> insertStaff(@RequestBody Staff staff, @PathVariable("id") UUID idStaff) {
        return ResponseEntity.status(HttpStatus.OK).body(new ResponObject("success", "Update thanh cong", this.staffService.update(idStaff, staff)));
    }

    @DeleteMapping({"/Staff/delete/{id}"})
    public ResponseEntity<ResponObject> deleteStaff(@PathVariable("id") UUID idStaff) {
        return ResponseEntity.status(HttpStatus.OK).body(new ResponObject("success", "Delete thanh cong", this.staffService.delete(idStaff)));
    }
}