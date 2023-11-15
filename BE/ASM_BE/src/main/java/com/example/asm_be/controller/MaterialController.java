//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package com.example.asm_be.controller;

import com.example.asm_be.dto.MaterialRespone;
import com.example.asm_be.entities.Material;
import com.example.asm_be.entities.ResponObject;
import com.example.asm_be.service.MaterialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping({"/CodeWalkers/admin"})
public class MaterialController {
    @Autowired
    private MaterialService materialService;

    public MaterialController() {
    }

@GetMapping({"/Material/select"})
public MaterialRespone getAllMaterial(@RequestParam(value = "pageNo",defaultValue = "0") Integer pageNo,
                                      @RequestParam(value = "sizePage", defaultValue = "5") Integer sizePage) {
    MaterialRespone  materialRespone=new MaterialRespone();
    Page<Material> materialPage = materialService.getAllPage(pageNo, sizePage);
    materialRespone.setMaterialList(materialPage.getContent());
    materialRespone.setTotalPages(materialPage.getTotalPages());

    return materialRespone;
}

    @PostMapping({"/Material/insert"})
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<ResponObject> insertCategory(@RequestBody Material materialRequest) {
        return ResponseEntity.status(HttpStatus.OK).body(new ResponObject("success", "Add thanh cong", this.materialService.save(materialRequest)));
    }

    @PutMapping({"/Material/update"})
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<ResponObject> updateCategory(@RequestBody Material materialRequest) {
        return ResponseEntity.status(HttpStatus.OK).body(new ResponObject("success", "Update thanh cong", this.materialService.update(materialRequest)));
    }

    @DeleteMapping({"/Material/delete/{id}"})
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<ResponObject> deleteStaff(@PathVariable("id") Integer idMaterial) {
        return ResponseEntity.status(HttpStatus.OK).body(new ResponObject("success", "Delete thanh cong", this.materialService.delete(idMaterial)));
    }
}