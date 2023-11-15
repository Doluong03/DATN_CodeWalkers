package com.example.asm_be.controller;

import com.example.asm_be.dto.SizeRespone;
import com.example.asm_be.dto.StaffReponse;
import com.example.asm_be.entities.ResponeObject;
import com.example.asm_be.entities.Role;
import com.example.asm_be.entities.Size;
import com.example.asm_be.entities.Staff;
import com.example.asm_be.payload.request.SignUpRequest;
import com.example.asm_be.service.ProductService;
import com.example.asm_be.service.RoleService;
import com.example.asm_be.service.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@RestController
@RequestMapping({"/CodeWalkers"})
public class NhanVienController {

    @Autowired
    private StaffService staffService;

    @Autowired
    private RoleService roleService;


    @GetMapping({"/admin/Staff"})
    public StaffReponse getAllStaff(@RequestParam(value = "pageNo",defaultValue = "0") Integer pageNo
            , @RequestParam(value = "sizePage", defaultValue = "5") Integer sizePage) {
        StaffReponse staffReponse = new StaffReponse();
        Page<Staff> staffPage = staffService.getAll(pageNo, sizePage);
        staffReponse.setRoleList(roleService.getAll());
        staffReponse.setStaffList(staffPage.getContent());
        staffReponse.setTotalPages(staffPage.getTotalPages());

        return staffReponse;
    }

    @GetMapping({"/admin/profile/{username}"})
    public Staff getProfile(@PathVariable("username") String  username) {
         Optional<Staff> staffList = staffService.findByUserName(username);
         return (staffList.get());
    }
    @PostMapping({"/admin/Staff/insert"})
    public ResponseEntity<ResponeObject> insertStaff(@RequestBody SignUpRequest signUpRequest) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ResponeObject("success", "Add thanh cong", this.staffService.saveStaff(signUpRequest)));
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

//    @GetMapping({"/admin/profile/{username}"})
//    public Staff getProfile(@PathVariable("username") String  username) {
//         Optional<Staff> staffList = staffService.findByUserName(username);
//         return (staffList.get());
//    }
}

