package com.example.asm_be.controller;

import com.example.asm_be.dto.UserVoucherResponse;
import com.example.asm_be.dto.VoucherRespone;
import com.example.asm_be.entities.ResponeObject;
import com.example.asm_be.entities.Users;
import com.example.asm_be.entities.VoucherUsers;
import com.example.asm_be.entities.Vouchers;
import com.example.asm_be.service.UserService;
import com.example.asm_be.service.VoucherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController()
@RequestMapping({"/CodeWalkers"})
public class VoucherController {
    @Autowired
    private VoucherService voucherService;
    @Autowired
    private UserService userService;

    @GetMapping("/user-voucher")
    private ResponseEntity<?> getVouchersByUserName(
            @RequestParam("userName") String userName) {
        // Xử lý loại bỏ khoảng trắng không mong muốn
        String cleanedUserName = userName.trim();

        Optional<Users> userOptional = userService.findByUserName(cleanedUserName);

        if (userOptional.isPresent()) {
            Users user = userOptional.get();
            List<UserVoucherResponse> vouchersList = user.getUsersUsages().stream()
                    .map(voucherUser -> {
                        Vouchers voucher = voucherUser.getVoucher();
                        return new UserVoucherResponse(
                                voucher.getId(),
                                voucher.getCode(),
                                voucher.getName(),
                                voucher.getDescription(),
                                voucher.getValue(),
                                voucher.getEndDate(),
                                voucher.isStatus(),
                                voucher.getImage(),
                                voucher.getUseForm(),
                                voucher.getCondition(),
                                voucher.getMaxReduction(),
                                voucher.getDiscountType(),
                                voucher.getCustomType(),
                                voucherUser.getUsageCount(),
                                voucherUser.isStatus()
                        );
                    })
                    .collect(Collectors.toList());

            return new ResponseEntity<>(vouchersList, HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/find-voucher")
    private ResponseEntity<List<Vouchers>> getVouchersByUserName(@RequestBody Vouchers vouchers) {

        List<Vouchers> vouchersList = Collections.singletonList(voucherService.getVouchersById(vouchers.getId()).get());

        if (vouchersList != null && !vouchersList.isEmpty()) {
            return ResponseEntity.ok(vouchersList);
        }

        return ResponseEntity.notFound().build();
    }

    @GetMapping("/admin/voucher")
    private VoucherRespone getAllVoucher(
            @RequestParam(value = "pageNo", defaultValue = "1") Integer pageNo,
            @RequestParam(value = "sizePage", defaultValue = "5") Integer sizePage) {
        VoucherRespone voucherRespone = new VoucherRespone();
        Page<Vouchers> vouchersPage = voucherService.getPageVoucher(pageNo - 1, sizePage);
        List<Vouchers> vouchersList = vouchersPage.getContent();
        voucherRespone.setVouchersList(vouchersList);
        voucherRespone.setTotalPages(vouchersPage.getTotalPages());

        return voucherRespone;
    }

    @GetMapping("/admin/user-voucher/getOne")
    private Integer getUserVoucher(@RequestParam(value = "id") Integer id) {
        return voucherService.getOneUserVoucher(id).get();
    }

    @GetMapping("/admin/voucher/getOne")
    private Vouchers getOneoucher(@RequestParam(value = "id") Integer id) {
        return voucherService.getOneVoucher(id).get();
    }

    @PostMapping("/voucher/search")
    private ResponseEntity<List<Vouchers>> getVouchersByMa(@RequestBody String maVc) {
        // Xử lý loại bỏ khoảng trắng không mong muốn
        String cleanedMaVc = maVc.trim();

        List<Vouchers> vouchersList = Collections.singletonList(voucherService.getVouchersByMa(cleanedMaVc).get());
        if (vouchersList != null) {
            return new ResponseEntity<>(vouchersList, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);

    }

    @PutMapping("/admin/voucher/update")
    private ResponseEntity<?> getVouchersByMa(@RequestBody Vouchers vouchers) {
        String message = voucherService.updateVoucher(vouchers) ? "update thanh cong" : "update that bai";

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ResponeObject(message.equals("update thanh cong")
                        ? "success" : "Failed", message, message.equals("update thanh cong")
                        ? vouchers : ""));
    }

    @PostMapping("/admin/voucher/save")
    private ResponseEntity<?> addVoucher(@RequestBody Vouchers vouchers) {
        String message = voucherService.addVoucher(vouchers) ? "add thanh cong" : "add that bai";

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ResponeObject(message.equals("add thanh cong")
                        ? "success" : "Failed", message, message.equals("add thanh cong")
                        ? vouchers : ""));

    }

    @DeleteMapping("/admin/voucher/delete/{id}")
    private ResponseEntity<?> deleteVoucherById(@PathVariable("id") Integer idVc) {
        String message = voucherService.deleteVoucher(idVc) ? "delete thanh cong" : "delete that bai";

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ResponeObject(message.equals("delete thanh cong")
                        ? "success" : "Failed", message, message.equals("delete thanh cong")
                        ? "Deleted id " + idVc : ""));
    }

    @PostMapping("/admin/voucher/turn-on/{id}")
    private ResponseEntity<?> turnOn(@PathVariable("id") int id) {
        voucherService.turnOn(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/admin/voucher/turn-off/{id}")
    private ResponseEntity<?> turnOff(@PathVariable("id") int id) {
        voucherService.turnOff(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/admin/voucher/save-voucherUser")
    private ResponseEntity<?> addVoucherUser(@RequestBody VoucherUsers vouchersUsers) {
        String message = voucherService.saveVoucherUser(vouchersUsers) ? "add thanh cong" : "add that bai";

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ResponeObject(message.equals("add thanh cong")
                        ? "success" : "Failed", message, message.equals("add thanh cong")
                        ? vouchersUsers : ""));

    }

    @DeleteMapping("/admin/user-voucher/delete/{id}")
    private ResponseEntity<?> deleteUserVoucherById(@PathVariable("id") Integer idVc) {
        String message = voucherService.deleteVoucherId(idVc) ? "delete thanh cong" : "delete that bai";

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ResponeObject(message.equals("delete thanh cong")
                        ? "success" : "Failed", message, message.equals("delete thanh cong")
                        ? "Deleted id " + idVc : ""));
    }

    @PatchMapping("/admin/user-voucher/update")
    private ResponseEntity<?> updateUserVoucher(@RequestBody VoucherUsers voucherUsers) {
        String message = voucherService.updateUserVoucher(voucherUsers.getUsageCount(),voucherUsers.getVoucher().getId()) ? "update thanh cong" : "update that bai";

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ResponeObject(message.equals("update thanh cong")
                        ? "success" : "Failed", message, message.equals("update thanh cong")
                        ? voucherUsers.getVoucher() : ""));
    }



}