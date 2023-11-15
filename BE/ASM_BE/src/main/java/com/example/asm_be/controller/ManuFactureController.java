package com.example.asm_be.controller;

import com.example.asm_be.dto.ManufactureRespone;
import com.example.asm_be.entities.Manufacture;
import com.example.asm_be.entities.ResponeObject;
import com.example.asm_be.service.ManuFactureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;

@RestController
@RequestMapping({"/CodeWalkers"})
public class ManuFactureController {

    @Autowired
    private ManuFactureService manuFactureService;


    @GetMapping({"/admin/Manufacture"})
    public ManufactureRespone getAllManuFacture(
            @RequestParam(value = "pageNo",defaultValue = "0") Integer pageNo
            ,@RequestParam(value = "sizePage",defaultValue = "5") Integer sizePage)
    {
        ManufactureRespone manufactureRespone = new ManufactureRespone();
        Page<Manufacture> manufacturePage = manuFactureService.getAll(pageNo,sizePage);

        manufactureRespone.setManufactureList(manufacturePage.getContent());
        manufactureRespone.setTotalPages(manufacturePage.getTotalPages());

        return manufactureRespone;
    }

    @PostMapping({"/admin/Manufacture/insert"})
    public ResponseEntity<ResponeObject> insertStaff(@RequestBody Manufacture manufacture) throws ParseException {

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ResponeObject("success", "Add thanh cong", manuFactureService.save(manufacture)));
    }

    @PutMapping({"/admin/Manufacture/update"})
    public ResponseEntity<ResponeObject> UpdateStaff(@RequestBody Manufacture manufacture) throws ParseException {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ResponeObject("success", "Update thanh cong", this.manuFactureService.update(manufacture)));
    }

    @DeleteMapping({"/admin/Manufacture/delete/{id}"})
    public ResponseEntity<ResponeObject> deleteStaff(@PathVariable("id") Integer idFacture) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ResponeObject("success", "Delete thanh cong", this.manuFactureService.delete(idFacture)));
    }
}
