package com.example.asm_be.controller;

import com.example.asm_be.dto.ProductDetailsRespone;
import com.example.asm_be.entities.Product;
import com.example.asm_be.entities.ProductDetail;
import com.example.asm_be.entities.ResponeObject;
import com.example.asm_be.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping({"/CodeWalkers"})
public class ProductdetailController {
    @Autowired
    private ProductDetailService productDetailService;

    @Autowired
    private SizeService sizeService;
    @Autowired
    private ProductService productService;
    @Autowired
    private MaterialService materialService;
    @Autowired
    private StatusService statusService;

    @Autowired
    private ColorService colorService;
    @Autowired
    private PromotionalService promotionalService;

    @GetMapping({"/admin/ProductDetails"})
    public ProductDetailsRespone getAllProductDetail(
            @RequestParam(value = "pageNo", defaultValue = "0") Integer pageNo
            , @RequestParam(value = "sizePage", defaultValue = "5") Integer sizePage) {
        ProductDetailsRespone productDetailsRespone = new ProductDetailsRespone();
        Page<ProductDetail> productDetailPage = productDetailService.getAllPage(pageNo, sizePage);

        productDetailsRespone.setProductDetailList(productDetailPage.getContent());
        productDetailsRespone.setTotalPages(productDetailPage.getTotalPages());
        productDetailsRespone.setProductList(productService.getAll());
        productDetailsRespone.setColorList(colorService.getAll());
        productDetailsRespone.setMaterialList(materialService.getAll());
        productDetailsRespone.setSizeList(sizeService.getAll());
        productDetailsRespone.setPromotionalList(promotionalService.getAll());
        productDetailsRespone.setProductDetailList(productDetailService.PRODUCT_DETAILS());
        productDetailsRespone.setStatusList(statusService.getAll());
        return productDetailsRespone;
    }

    @PostMapping({"/admin/ProductDetails/insert"})
    public ResponseEntity<ResponeObject> insertProductDetail(@RequestBody ProductDetail ProductDetail) throws ParseException {
        ProductDetail.setCreatedAt(new Date());
        ProductDetail.setStatus(statusService.getOne(1));
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ResponeObject("success", "Add thanh cong", productDetailService.save(ProductDetail)));
    }

    @PutMapping({"/admin/ProductDetails/update"})
    public ResponseEntity<ResponeObject> UpdateProductDetail(@RequestBody ProductDetail ProductDetail) throws ParseException {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ResponeObject("success", "Update thanh cong", productDetailService.save(ProductDetail)));
    }

    @DeleteMapping({"/admin/ProductDetails/delete/{id}"})
    public ResponseEntity<ResponeObject> deleteProductDetail(@PathVariable("id") Integer idProduct) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ResponeObject("success", "Delete thanh cong", productDetailService.delete(idProduct)));
    }

    @GetMapping("/admin/ProductDetails/details")
    public List<ProductDetail> detailsProduct(@RequestParam("productName") String productName) {
        return productDetailService.findByProductName(productName);
    }

    @PostMapping("/admin/ProductDetails/switch-all-by-pr/{idPr}")
    private ResponseEntity<?> switchAllByPr(@PathVariable("idPr") int idPr) {
        productService.switchStatus(idPr);
        List<ProductDetail> productDetailList = productDetailService.findByPrId(idPr);
        if(productService.getOne(idPr).isStatus()){
            productDetailList.forEach(productDetail -> {
                productDetailService.turnOn(productDetail.getId());
            });
        }else{
            productDetailList.forEach(productDetail -> {
                productDetailService.turnOff(productDetail.getId());
            });
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

//    @PostMapping("/admin/ProductDetails/turn-off-all/{idPr}")
//    public ResponseEntity<?> turnOffAll(@PathVariable("idPr") int idPr) {
//        productService.switchStatus(idPr);
//        List<ProductDetail> productDetailList = productDetailService.findByPrId(idPr);
//        productDetailList.forEach(productDetail -> {
//            productDetailService.turnOff(productDetail.getId());
//        });
//        return new ResponseEntity<>(HttpStatus.OK);
//    }

    @PostMapping("/admin/ProductDetails/turn-on/{id}")
    private ResponseEntity<?> turnOn(@PathVariable("id") int id) {
        productDetailService.turnOn(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/admin/ProductDetails/turn-off/{id}")
    public ResponseEntity<?> turnOff(@PathVariable("id") int id) {
        productDetailService.turnOff(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
