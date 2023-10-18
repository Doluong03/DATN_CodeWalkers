//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package com.example.asm_be.controller;

import com.example.asm_be.entities.ResponeObject;
import com.example.asm_be.entities.Staff;
import com.example.asm_be.service.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin({"*"})
@RequestMapping({"/CodeWalkers"})
public class NhanVienController {
    @Autowired
    private StaffService staffService;

    public NhanVienController() {
    }

    @GetMapping({"/admin/Staff"})
    public List<Staff> getAllProduct(@RequestParam(value = "pageNo",defaultValue = "0") Integer pageNo) {
        Page<Staff> staffPage = staffService.getAll(pageNo);
        List<Staff> staffList = staffPage.getContent();
        return staffList;
    }

    @PostMapping({"/admin/Staff/insert"})
    public ResponseEntity<ResponeObject> insertStaff(@RequestBody Staff staff) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ResponeObject("success", "Add thanh cong", this.staffService.save(staff)));
    }

    @PutMapping({"/admin/Staff/update"})
    public ResponseEntity<ResponeObject> UpdateStaff(@RequestBody Staff staff) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ResponeObject("success", "Update thanh cong", this.staffService.update(staff)));
    }

    @DeleteMapping({"/admin/Staff/delete/{id}"})
    public ResponseEntity<ResponeObject> deleteStaff(@PathVariable("id") Integer idStaff) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ResponeObject("success", "Delete thanh cong", this.staffService.delete(idStaff)));
    }

    @GetMapping({"/admin/profile/{username}"})
    public Staff getProfile(@PathVariable("username") String  username) {
         Optional<Staff> staffList = staffService.findByUserName(username);
         return (staffList.get());
    }
}