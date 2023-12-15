package com.example.asm_be.controller.admin;

import com.example.asm_be.dto.BillRespone;
import com.example.asm_be.dto.ProductDetailsRespone;
import com.example.asm_be.entities.*;
import com.example.asm_be.service.BillDetailService;
import com.example.asm_be.service.BillService;
import com.example.asm_be.service.CartService;
import com.example.asm_be.service.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.io.Reader;
import java.util.List;

@CrossOrigin("*")
@RestController()
@RequestMapping("/CodeWalkers")
public class BillManageController {
    @Autowired
    BillService billService;
    @Autowired
    UserService userService;
    @Autowired
    CartService cartService;
    @Autowired
    BillDetailService billDetailService;
    @Autowired
    ObjectMapper objectMapper;


    @GetMapping({"/admin/Bill/get-all-bill"})
    public List<BillRespone> getAllBill(
            @RequestParam(value = "pageNo", defaultValue = "0") Integer pageNo,
            @RequestParam(value = "sizePage", defaultValue = "5") Integer sizePage) throws JsonProcessingException {
        Page<Bill> billPage = billService.getAllPage(pageNo, sizePage);
        ObjectMapper objectMapper = new ObjectMapper();
        String billPageJson = objectMapper.writeValueAsString(billPage.getContent());
        List<BillRespone> billResponseList = objectMapper.readValue(billPageJson, new TypeReference<List<BillRespone>>() {
        });
        // Set the totalPage in the first item of the response list (assuming there's at least one item in the list)
        if (!billResponseList.isEmpty()) {
            billResponseList.get(0).setTotalPages(billPage.getTotalPages());
        }
        return billResponseList;
    }

    @GetMapping({"/admin/Bill/get-all-bill/{status}"})
    public List<BillRespone> getAllBillByStatus(@PathVariable("status") int status,
                                                @RequestParam(value = "pageNo", defaultValue = "0") Integer pageNo,
                                                @RequestParam(value = "sizePage", defaultValue = "5") Integer sizePage) throws JsonProcessingException {
        Page<Bill> billPage = billService.getAllPageByStatsus(pageNo, sizePage, status);
        ObjectMapper objectMapper = new ObjectMapper();
        String billPageJson = objectMapper.writeValueAsString(billPage.getContent());
        List<BillRespone> billResponseList = objectMapper.readValue(billPageJson, new TypeReference<List<BillRespone>>() {
        });
        // Set the totalPage in the first item of the response list (assuming there's at least one item in the list)
        if (!billResponseList.isEmpty()) {
            billResponseList.get(0).setTotalPages(billPage.getTotalPages());
        }
        return billResponseList;
    }

    @PutMapping({"/admin/Bill/updateStatus/{id}"})
//    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<ResponObject> updateStatus(@PathVariable("id") Integer idBill, @RequestParam Integer status) {
        billService.updateStatus(idBill, status);
        return ResponseEntity.status(HttpStatus.OK)
                .build();
    }

    @PutMapping({"/admin/Bill/updateUser/{id}"})
//    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<ResponObject> updateUser(@PathVariable("id") Integer idUser, @RequestParam String name, @RequestParam String phone) {
        try {
            Users users = userService.getOne(idUser);
            users.setName(name);
            users.setPhoneNumber(phone);
            users.setStatus(true);
            userService.save(users);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return ResponseEntity.status(HttpStatus.OK)
                .build();
    }

    @DeleteMapping({"/admin/Bill/deleteUser/{id}"})
    public ResponseEntity<ResponeObject> deleteUser(@PathVariable("id") Integer idUsers) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ResponeObject("success", "Delete thanh cong", this.userService.delete(idUsers)));
    }

    @DeleteMapping("/admin/Bill/deleteCart/{cartId}")
    public ResponseEntity<?> deleteCart(@PathVariable("cartId") int cartId) {
        if (cartService.delete(cartId)) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Lỗi xóa gio hang");
        }
    }

    @PutMapping("/admin/BillDt/updateQuantity/{idBillDt}")
    public ResponseEntity<?> updateQuantity(@PathVariable("idBillDt") int idBilldt, @RequestParam int quantity) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ResponeObject("success", "Update thanh cong", this.billDetailService.updateQuantity(idBilldt,quantity)));
    }

}
