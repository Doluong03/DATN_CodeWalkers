package com.example.asm_be.controller.admin;

import com.example.asm_be.dto.BillRespone;
import com.example.asm_be.dto.ProductDetailsRespone;
import com.example.asm_be.entities.Bill;
import com.example.asm_be.entities.ProductDetail;
import com.example.asm_be.entities.ResponObject;
import com.example.asm_be.service.BillService;
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
        billService.updateStatus(idBill,status);
        return ResponseEntity.status(HttpStatus.OK)
                .build();
    }
}
