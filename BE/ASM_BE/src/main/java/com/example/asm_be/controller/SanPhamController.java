<<<<<<< Updated upstream
package com.example.asm_be.controller;

import com.example.asm_be.DTO.BrandRespone;
import com.example.asm_be.DTO.ProductRespone;
import com.example.asm_be.entities.Brands;
import com.example.asm_be.entities.Product;
import com.example.asm_be.entities.ResponeObject;
import com.example.asm_be.entities.Status;

import com.example.asm_be.service.ProductService;
import com.example.asm_be.service.StatusService;
=======

package com.example.asm_be.controller;

import com.example.asm_be.dto.ProductRespone;
import com.example.asm_be.dto.UserRespone;
import com.example.asm_be.entities.Category;
import com.example.asm_be.entities.Product;
import com.example.asm_be.entities.ResponeObject;
import com.example.asm_be.entities.Users;
import com.example.asm_be.service.BrandService;
import com.example.asm_be.service.CategoryService;
import com.example.asm_be.service.ProductService;
import com.example.asm_be.service.UserService;
>>>>>>> Stashed changes
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
<<<<<<< Updated upstream
=======
import org.springframework.security.access.prepost.PreAuthorize;
>>>>>>> Stashed changes
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

<<<<<<< Updated upstream
@RestController
@CrossOrigin({"*"})
@RequestMapping({"/CodeWalkers"})
public class SanPhamController {
=======
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Collection;
import java.util.Date;
import java.util.Locale;

@CrossOrigin({"*"})
@RestController
@RequestMapping({"/CodeWalkers"})
public class SanPhamController {

    @Autowired
    private BrandService brandService;

>>>>>>> Stashed changes
    @Autowired
    private ProductService productService;

    @Autowired
<<<<<<< Updated upstream
    private StatusService statusService;

    public SanPhamController(){

    }

    @GetMapping({"/admin/Product"})
    public ProductRespone getAllProduct(@RequestParam(value = "pageNo",defaultValue = "0") Integer pageNo) {
        ProductRespone productRespone = new ProductRespone();
        Page<Product> productPage = productService.getAll(pageNo);
=======
    private CategoryService categoryService;




    public SanPhamController() {
    }

    @GetMapping({"/admin/Product"})
    public ProductRespone getAllProduct(
            @RequestParam(value = "pageNo", defaultValue = "0") Integer pageNo,
            @RequestParam(value = "sizePage", defaultValue = "5") Integer sizePage) {
        ProductRespone productRespone = new ProductRespone();
        Page<Product> productPage = productService.getAll(pageNo, sizePage);
>>>>>>> Stashed changes

        productRespone.setProductList(productPage.getContent());
        productRespone.setTotalPages(productPage.getTotalPages());

        return productRespone;
    }

<<<<<<< Updated upstream
    @PostMapping({"/admin/Product/insert"})
    public ResponseEntity<ResponeObject> insertProduct(@RequestBody Product product) {
        return ResponseEntity.status(HttpStatus.OK).body(new ResponeObject("success", "Add thanh cong", this.productService.save(product)));
    }

    @PutMapping({"/admin/Product/update"})
    public ResponseEntity<ResponeObject> insertProduct(@RequestBody Product product, @PathVariable("id") Integer idProduct) {

        return ResponseEntity.status(HttpStatus.OK).body(new ResponeObject("success", "Update thanh cong", this.productService.update(idProduct, product)));
    }

    @DeleteMapping({"/admin/Product/delete/{id}"})
    public ResponseEntity<ResponeObject> deleteProduct(@PathVariable("id") Integer idProduct) {
        return ResponseEntity.status(HttpStatus.OK).body(new ResponeObject("success", "Delete thanh cong", this.productService.delete(idProduct)));
    }
=======

    @GetMapping("/admin/Product/Category")
    public ResponseEntity<Collection<Category>> getCategory() {
        return ResponseEntity.ok(categoryService.getAll());
    }


    @PostMapping({"/admin/Product/insert"})
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<ResponeObject> insertProduct(@RequestBody Product product) throws ParseException {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ResponeObject("success", "Add thanh cong", productService.save(product)));
    }

    @PutMapping({"/admin/Product/update"})
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<ResponeObject> UpdateProduct(@RequestBody Product product) throws ParseException {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ResponeObject("success", "Update thanh cong", this.productService.update(product)));
    }

    @DeleteMapping({"/admin/Product/delete/{id}"})
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<ResponeObject> deleteProduct(@PathVariable("id") Integer idProduct) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ResponeObject("success", "Delete thanh cong", this.productService.delete(idProduct)));

    }


>>>>>>> Stashed changes
}
