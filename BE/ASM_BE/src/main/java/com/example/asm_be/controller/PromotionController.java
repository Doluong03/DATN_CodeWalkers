package com.example.asm_be.controller;

import com.example.asm_be.dto.ProductRespone;
import com.example.asm_be.dto.PromotionDetailRespone;
import com.example.asm_be.dto.PromotionRespone;
import com.example.asm_be.entities.Product;
import com.example.asm_be.entities.PromotionDetails;
import com.example.asm_be.entities.Promotional;
import com.example.asm_be.entities.ResponeObject;
import com.example.asm_be.request.ProDetialRequets;
import com.example.asm_be.service.PromotionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RestController()
@RequestMapping({"/CodeWalkers"})
@CrossOrigin("*")
public class PromotionController {
    @Autowired
    private PromotionService promotionService;

    @GetMapping({"/admin/promotion"})
    public PromotionRespone getAllPagePromotion(
            @RequestParam(value = "pageNo", defaultValue = "1") Integer pageNo) {
        PromotionRespone promotionRespone = new PromotionRespone();
        Page<Promotional> promotionalPage = promotionService.getAll(pageNo-1);
        promotionRespone.setPromotionalList(promotionalPage.getContent());
        promotionRespone.setTotalPages(promotionalPage.getTotalPages());

        return promotionRespone;
    }

    @GetMapping({"/api/active_promotions"})
    public List<Promotional> getAllActivePromotion() {
        return promotionService.getAllActivePromotion();
    }

    @PostMapping({"/admin/promotion/save"})
    public ResponseEntity<?> savePromotion(@RequestBody Promotional promotional) {
        String message = promotionService.savePromotion(promotional) ? "add thanh cong" : "add that bai";

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ResponeObject(message.equals("add thanh cong")
                        ? "success" : "Failed", message, message.equals("add thanh cong")
                        ? promotional : ""));

    }

    @PostMapping({"/admin/promotion-details/save"})
    public ResponseEntity<?> savePromotionDetails(@RequestBody PromotionDetails promotionDetails) {
        String message = promotionService.savePromoTinDetails(promotionDetails) ? "add thanh cong" : "add that bai";

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ResponeObject(message.equals("add thanh cong")
                        ? "success" : "Failed", message, message.equals("add thanh cong")
                        ? promotionDetails : ""));

    }

    @GetMapping({"/api/promotion/{idPromo}/{idProductDt}"})
    public List<PromotionDetailRespone> findByIdPro
            (@PathVariable("idPromo") Integer idPromo,@PathVariable("idProductDt") int idProductDt) {
        return  promotionService.findById(idPromo,idProductDt);
    }


    @PostMapping("/admin/promotion/turn-on/{id}")
    private ResponseEntity<?> turnOn(@PathVariable("id") int id) {
        promotionService.turnOn(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/admin/promotion/turn-off/{id}")
    private ResponseEntity<?> turnOff(@PathVariable("id") int id) {
        promotionService.turnOff(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/admin/promotion/delete/{id}")
    public ResponseEntity<?> deletePromotion(@PathVariable("id") int id) {
        String message = promotionService.deletePromotion(id) ? "add thanh cong" : "add that bai";

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ResponeObject(message.equals("add thanh cong")
                        ? "success" : "Failed", message, message.equals("add thanh cong")
                        ? "oke da xoa" : ""));

    }

    @GetMapping("/admin/promotion/details/{id}")
    public Promotional detailsPromotion(@PathVariable("id") int id) {
        Optional<Promotional> promotionalOptional = promotionService.findById(id);
            return promotionalOptional.get();
    }


    @PutMapping({"/admin/promotion/update"})
    public ResponseEntity<?> updatePromotion(@RequestBody Promotional promotion) {
        String message = promotionService.updatePromotion(promotion) ? "update thanh cong" : "update that bai";

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ResponeObject(message.equals("update thanh cong")
                        ? "success" : "Failed", message, message.equals("update that bai")
                        ? "" : promotion));

    }

    @PutMapping("/admin/promotionDetials/update")
    public ResponseEntity<?> PromotionDetails(@RequestBody ProDetialRequets requets) {
        String message = promotionService.UpdateProDetai
                (requets.getDiscount(),requets.getIdPro(),requets.getIdProduct()) ? "add thanh cong" : "add that bai";

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ResponeObject(message.equals("add thanh cong")
                        ? "success" : "Failed", message, message.equals("add thanh cong")
                        ? "oke da xoa" : ""));

    }
    @DeleteMapping("/admin/promotion/delete-detail/{idProDetail}/{idPro}")
    public ResponseEntity<?> deletePromotionDetail(@PathVariable("idProDetail") int idProDetail
            ,@PathVariable("idPro") Integer idPro) {
        String message = promotionService.deleteProDetail(idProDetail,idPro) ? "add thanh cong" : "add that bai";

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ResponeObject(message.equals("add thanh cong")
                        ? "success" : "Failed", message, message.equals("add thanh cong")
                        ? "oke da xoa" : ""));

    }

    @DeleteMapping("/admin/promotion/delete-detail2/{idPro}")
    public ResponseEntity<?> deleteAll(@PathVariable("idPro") int idPro) {
        String message = promotionService.deleteAll(idPro) ? "add thanh cong" : "add that bai";

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ResponeObject(message.equals("add thanh cong")
                        ? "success" : "Failed", message, message.equals("add thanh cong")
                        ? "oke da xoa" : ""));

    }

    @GetMapping({"/api/promotion2/getALL2"})
    public List<Promotional> getALL2() {
        return  promotionService.getAll();
    }
}
