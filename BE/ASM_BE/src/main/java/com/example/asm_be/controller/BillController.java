package com.example.asm_be.controller;

import com.example.asm_be.entities.*;
import com.example.asm_be.request.CreateOrder;
import com.example.asm_be.request.FeeRequest;
import com.example.asm_be.request.AddBillRequest;
import com.example.asm_be.request.Invariable;
import com.example.asm_be.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@CrossOrigin("*")
@RestController()
@RequestMapping("/CodeWalkers")
public class BillController {
    @Autowired
    CartDetailService cartDetailService;
    @Autowired
    CartService cartService;
    @Autowired
    ProductDetailService productDetailService;
    @Autowired
    BillService billService;
    @Autowired
    BillDetailService billDetailService;
    @Autowired
    UserService userService;


    @GetMapping("/api/billDt")
    public ResponseEntity<Collection<BillDetails>> getAllBillDt(@RequestParam int idBill) {
        return ResponseEntity.ok(billDetailService.getAll(idBill));
    }

    @GetMapping("/api/getBill")
    public ResponseEntity<Collection<Bill>> getBill(@RequestParam int idCart) {
        Users users = userService.findByCartId(idCart);
        return ResponseEntity.ok(billService.getByUser(users.getId()));
    }


    @PostMapping("/api/addBill/{idUser}")
    public ResponseEntity<?> CreateBill(@PathVariable("idUser") int idUser) {
        if(idUser==0){
            Users usersNew = new Users();
            userService.save(usersNew);
            return ResponseEntity.ok(billService.save(new Bill(),usersNew));
        }else{
            Users users = userService.getOne(idUser);

            return ResponseEntity.ok(billService.save(new Bill(),users));
        }
    }

    @PostMapping("/api/addBillDt/{idBill}/{idCart}")
    public ResponseEntity<?> addBillDt(@PathVariable("idCart") int idCart, @PathVariable("idBill") int idBill) {
        return ResponseEntity.ok(billDetailService.save( idBill, idCart));
    }

    @PostMapping({"/calculateFee"})
    public ResponseEntity<?> getFeeShip(@RequestBody FeeRequest phiVanChuyenRequest) {
        try {
            Integer fee = billService.getFee(phiVanChuyenRequest);
            return ResponseEntity.status(HttpStatus.OK).body(fee);
        } catch (Exception var3) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(var3.getMessage());
        }
    }

    @PostMapping("/bill/createOrder")
    public ResponseEntity<?> createOrder(@RequestBody CreateOrder createOrder) {
        try {
         Object obj = billService.createOrder(createOrder);
            return ResponseEntity.ok(obj);
        } catch (Exception var) {
            var.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(var.getMessage());
        }
    }
    @PutMapping("/bill/updateBill")
    public ResponseEntity<?> updateBill(@RequestBody AddBillRequest billRequest) {
        try {
            System.out.println(billRequest + "<---");
          String url =  billService.update(billRequest);
          return ResponseEntity.ok(url);
        } catch (Exception var) {
            var.printStackTrace();
        }
        return null;
    }
}
