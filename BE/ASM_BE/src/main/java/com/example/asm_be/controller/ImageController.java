package com.example.asm_be.controller;

import com.example.asm_be.dto.ImageRespone;
import com.example.asm_be.entities.Image;
import com.example.asm_be.entities.ResponeObject;
import com.example.asm_be.service.ImageService;
import com.example.asm_be.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;

@RestController
@RequestMapping({"/CodeWalkers/admin"})
public class ImageController {
    @Autowired
    private ImageService imageService;
    @Autowired
    private ProductService productService;

    @GetMapping({"/Image"})
    public ImageRespone getAllImage(
            @RequestParam(value = "pageNo", defaultValue = "0") Integer pageNo
            , @RequestParam(value = "sizePage", defaultValue = "5") Integer sizePage) {
        ImageRespone imageRespone = new ImageRespone();
        Page<Image> imagePage = imageService.getAll(pageNo, sizePage);
        imageRespone.setProductList(productService.getAll());
        imageRespone.setImageList(imagePage.getContent());
        imageRespone.setTotalPages(imagePage.getTotalPages());

        return imageRespone;
    }

    @PostMapping({"/Image/insert"})
    public ResponseEntity<ResponeObject> insertImage(@RequestBody Image image) throws ParseException {

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ResponeObject("success", "Add thanh cong", imageService.save(image)));
    }

    @PutMapping({"/Image/update"})
    public ResponseEntity<ResponeObject> UpdateImage(@RequestBody Image image) throws ParseException {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ResponeObject("success", "Update thanh cong", this.imageService.update(image)));
    }

    @DeleteMapping({"/Image/delete/{id}"})
    public ResponseEntity<ResponeObject> deleteImage(@PathVariable("id") Integer idImage) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ResponeObject("success", "Delete thanh cong", this.imageService.delete(idImage)));
    }
}
