package com.example.asm_be.controller;
import com.example.asm_be.entities.*;
import com.example.asm_be.request.*;
import com.example.asm_be.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import com.example.asm_be.dto.BillResponeAdmin;
import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;
import java.util.Optional;

@RestController()
@RequestMapping({"/CodeWalkers"})
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

    @Autowired
    StaffService staffService;

//    @GetMapping("/get/Staff")
//    public List<Staff> getStaff() {
//        return staffService.getList();
//    }
    @GetMapping("/get/User")
    public List<Users> getUser() {
        return userService.getList();
    }
    @GetMapping({"/admin/Bill/select"})
    public BillResponeAdmin getAllBill(@RequestParam(value = "pageNo",defaultValue = "0")Integer pageNo,
                                       @RequestParam(value = "sizePage", defaultValue = "5") Integer sizePage) {
        BillResponeAdmin billResponeAdmin = new BillResponeAdmin();
        Page<Bill> billPage = billService.getAll(pageNo,sizePage);

        billResponeAdmin.setBillList(billPage.getContent());
        billResponeAdmin.setTotalPages(billPage.getTotalPages());

        return billResponeAdmin;
    }

    @PostMapping({"/Bill/insert"})
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<ResponObject> insertBill(@RequestBody Bill bill) {
        return ResponseEntity.status(HttpStatus.OK).body(new ResponObject("success", "Add thanh cong", this.billService.saveAdmin(bill)));
    }

//    @PutMapping({"/Bill/update"})
//    @PreAuthorize("hasRole('ROLE_ADMIN')")
//    public ResponseEntity<ResponObject> updateBill(@RequestBody BillRequest1 billRequest) {
//        return ResponseEntity.status(HttpStatus.OK).body(new ResponObject("success", "Update thanh cong", this.billService.updateAdmin(billRequest)));
//    }

    @DeleteMapping({"/Bill/delete/{id}"})
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<ResponObject> deleteBill(@PathVariable("id") Integer idBill) {
        return ResponseEntity.status(HttpStatus.OK).body(new ResponObject("success", "Delete thanh cong", this.billService.delete(idBill)));
    }

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
    @PutMapping("/api/bill/updateBillDt/{idBill}")
    public ResponseEntity<?> updateBillDt(@PathVariable("idBill") int idBill, @RequestBody List<BillDetailsRequest> detailsRequests ) {
        billDetailService.update(idBill,detailsRequests);
        return ResponseEntity.ok().build();
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
    @PutMapping("/bill/updateBillAdmin")
    public ResponseEntity<?> updateBillAdmin(@RequestBody BillRequest billRequest) {
        try {
            System.out.println(billRequest + "<---");
            Bill bill = billService.getOne(billRequest.getBillId());
            if(bill!= null){
                bill.setShipDate(billRequest.getShipDate());
                bill.setDescription(billRequest.getCode());
            }
            return ResponseEntity.ok(billService.saveAdmin(bill));
        } catch (Exception var) {
            var.printStackTrace();
        }
        return null;
    }
}
