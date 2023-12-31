package com.example.asm_be.controller;

import com.example.asm_be.dto.ImageRespone;
import com.example.asm_be.entities.Image;
import com.example.asm_be.entities.Product;
import com.example.asm_be.entities.ResponeObject;
import com.example.asm_be.service.ImageService;
import com.example.asm_be.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.text.ParseException;
import java.util.List;

@RestController
@RequestMapping({"/CodeWalkers/admin"})
public class ImageController {
    @Autowired
    private ImageService imageService;
    @Autowired
    private ProductService productService;

    @GetMapping({"/Image"})
    public ImageRespone getAllImage() {
        ImageRespone imageRespone = new ImageRespone();
        List<Image> imagePage = imageService.getAll();
        imageRespone.setImageList(imagePage);
        imageRespone.setProductList(productService.getAll());
        return imageRespone;
    }

    @PostMapping({"/Image/insert"})
    public ResponseEntity<ResponeObject> insertImage(@RequestBody Image image) throws ParseException {

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ResponeObject("success", "Add thanh cong", imageService.save(image)));
    }

    @PutMapping({"/Image/updateById/{idPr}"})
    public ResponseEntity<ResponeObject> UpdateImage(@PathVariable("idPr") int idPr) throws ParseException {
        List<Image> list = imageService.findByIdPr(idPr);
        for (Image x: list) {
            x.setProduct(null);
            this.imageService.save(x);
        }
        return ResponseEntity
                .status(HttpStatus.OK)
                .build();
    }

    @DeleteMapping({"/Image/delete/{id}"})
    public ResponseEntity<ResponeObject> deleteImage(@PathVariable("id") Integer idImage) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ResponeObject("success", "Delete thanh cong", this.imageService.delete(idImage)));
    }
    @PutMapping({"/Image/updateImgCb/{idImg}"})
    public ResponseEntity<ResponeObject> UpdateImageCb(@PathVariable("idImg") int idImg, @RequestParam int idPr) throws ParseException {
        Image imageRes = imageService.getOne(idImg);

        // Kiểm tra nếu imageRes là null
        if (imageRes == null) {
            // Xử lý hoặc trả về lỗi tùy thuộc vào logic của bạn
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResponeObject("error", "Không tìm thấy ảnh với idImg = " + idImg, null));
        }

        Product productRes = productService.getOne(idPr);

        // Kiểm tra nếu productRes là null
        if (productRes == null) {
            // Xử lý hoặc trả về lỗi tùy thuộc vào logic của bạn
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResponeObject("error", "Không tìm thấy sản phẩm với idPr = " + idPr, null));
        }

        imageRes.setProduct(productRes);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ResponeObject("success", "Update thanh cong", this.imageService.update(imageRes)));
    }

    @PostMapping("/uploadImg")
    public ResponseEntity<String> handleFileUpload(@RequestPart("images") MultipartFile[] files) throws IOException {
        if (files != null && files.length > 0) {
            imageService.processImageDirectory(files);

            // Return a success response
            return ResponseEntity.ok("Images uploaded successfully");
        } else {
            // Handle the case where no file is provided
            return ResponseEntity.badRequest().body("No files provided");
        }
    }


}
