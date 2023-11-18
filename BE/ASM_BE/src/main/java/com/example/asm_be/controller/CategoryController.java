//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package com.example.asm_be.controller;


import com.example.asm_be.dto.CategoryRespone;
import com.example.asm_be.entities.Category;
import com.example.asm_be.entities.ResponObject;
import com.example.asm_be.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping({"/CodeWalkers/admin"})
public class CategoryController {
    @Autowired
    private CategoryService categoryService;

    public CategoryController() {
    }

//    @GetMapping({"/Staff"})
//    public List<Staff> getAllProduct(@RequestParam(value = "pageNo",defaultValue = "0") Integer pageNo) {
//        Page<Staff> staffPage = this.staffService.getAll(pageNo);
//        List<Staff> staffList = staffPage.getContent();
//        return staffList;
//    }
@GetMapping({"/admin/Category"})
public CategoryRespone getAllCategory(@RequestParam(value = "pageNo",defaultValue = "0")Integer pageNo,
                                      @RequestParam(value = "sizePage", defaultValue = "5") Integer sizePage) {
    CategoryRespone categoryRespone = new CategoryRespone();
    Page<Category> categoryPage = categoryService.getAllPage(pageNo,sizePage);

    categoryRespone.setCategoryList(categoryPage.getContent());
    categoryRespone.setCategoryPages(categoryPage.getTotalPages());

    return categoryRespone;
}

    @PostMapping({"/Category/insert"})
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<ResponObject> insertCategory(@RequestBody Category categoryRequest) {
        return ResponseEntity.status(HttpStatus.OK).body(new ResponObject("success", "Add thanh cong", this.categoryService.save(categoryRequest)));
    }

    @PutMapping({"/Category/update"})
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<ResponObject> updateCategory(@RequestBody Category category) {
        return ResponseEntity.status(HttpStatus.OK).body(new ResponObject("success", "Update thanh cong", this.categoryService.update(category)));
    }

    @DeleteMapping({"/Category/delete/{id}"})
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<ResponObject> deleteStaff(@PathVariable("id") Integer idCategory) {
        return ResponseEntity.status(HttpStatus.OK).body(new ResponObject("success", "Delete thanh cong", this.categoryService.delete(idCategory)));
    }
}