package com.example.asm_be.controller;

import com.example.asm_be.dto.SizeRespone;
import com.example.asm_be.entities.ResponeObject;
import com.example.asm_be.entities.Size;
import com.example.asm_be.service.SizeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping({"/CodeWalkers/admin"})
public class SizeController {
    @Autowired
    private SizeService sizeService;
    @GetMapping({"/Size"})
    public SizeRespone getAllSize(
            @RequestParam(value = "pageNo", defaultValue = "0") Integer pageNo
            , @RequestParam(value = "sizePage", defaultValue = "5") Integer sizePage) {
        SizeRespone sizeReponse = new SizeRespone();
        Page<Size> sizePage1 = sizeService.getAllPage(pageNo, sizePage);
        sizeReponse.setSizeList(sizePage1.getContent());
        sizeReponse.setTotalPages(sizePage1.getTotalPages());

        return sizeReponse;
    }

    @PostMapping({"/Size/insert"})
    public ResponseEntity<ResponeObject> insertSize(@RequestBody Size size) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new ResponeObject("success", "Add thanh cong", this.sizeService.save(size)));
    }

    @PutMapping({"/Size/update"})
    public ResponseEntity<ResponeObject> updateSize(@RequestBody Size size) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new ResponeObject("success", "Update thanh cong", this.sizeService.update(size)));
    }
    @DeleteMapping({"/Size/delete/{id}"})
    public ResponseEntity<ResponeObject> deleteSize(@PathVariable("id") Integer idSize) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new ResponeObject("success", "Delete thanh cong", this.sizeService.delete(idSize)));

    }
}
