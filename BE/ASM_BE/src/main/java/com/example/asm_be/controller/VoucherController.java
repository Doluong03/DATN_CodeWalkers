package com.example.asm_be.controller;

import com.example.asm_be.entities.ResponeObject;
import com.example.asm_be.entities.Vouchers;
import com.example.asm_be.service.VoucherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController()
@RequestMapping({"/CodeWalkers"})
public class VoucherController {
    @Autowired
    private VoucherService voucherService;

    @GetMapping("/user-voucher")
    private ResponseEntity<List<Vouchers>>getVouchersByUserName(
            @RequestParam("username") String userName){
        // Xử lý loại bỏ khoảng trắng không mong muốn
        String cleanedUserName = userName.trim();

        List<Vouchers> vouchersList = voucherService.getVouchersByUserName(cleanedUserName);
        if(vouchersList != null){
            return new ResponseEntity<>(vouchersList, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);

    }


    @PostMapping("/find-voucher")
    private ResponseEntity<List<Vouchers>> getVouchersByUserName(
            @RequestBody Vouchers vouchers) {

        List<Vouchers> vouchersList = Collections.singletonList(voucherService.getVouchersById(vouchers.getId()).get());

        if (vouchersList != null && !vouchersList.isEmpty()) {
            return ResponseEntity.ok(vouchersList);
        }

        return ResponseEntity.notFound().build();
    }

}