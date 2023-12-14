package com.example.asm_be.controller;

import com.example.asm_be.dto.RankRespone;
import com.example.asm_be.entities.Rank;
import com.example.asm_be.entities.ResponeObject;
import com.example.asm_be.service.RankService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping({"/CodeWalkers"})
@CrossOrigin("*")
public class RankController {

    @Autowired
    private RankService rankService;

    @GetMapping({"/admin/rank"})
    public RankRespone getAllRank(
            @RequestParam(value = "pageNo", defaultValue = "1") Integer pageNo,
            @RequestParam(value = "sizePage", defaultValue = "10") Integer sizePage) {
        RankRespone rankRespone = new RankRespone();
        Page<Rank> promotionalPage = rankService.getAll(pageNo - 1, sizePage);
        rankRespone.setRankList(promotionalPage.getContent());
        rankRespone.setTotalPages(promotionalPage.getTotalPages());

        return rankRespone;
    }

    @PostMapping({"/admin/rank/save"})
    public ResponseEntity<?> saveRank(@RequestBody Rank rank) {
        String message = rankService.saveRank(rank) ? "add thanh cong" : "add that bai";

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ResponeObject(message.equals("add thanh cong")
                        ? "success" : "Failed", message, message.equals("add thanh cong")
                        ? rank : ""));

    }

    @DeleteMapping("/admin/rank/delete/{id}")
    public ResponseEntity<?> deleteRank(@PathVariable("id") Integer id) {
        String message = rankService.deleteRank(id) ? "add thanh cong" : "add that bai";

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ResponeObject(message.equals("add thanh cong")
                        ? "success" : "Failed", message, message.equals("add thanh cong")
                        ? "oke da xoa" : ""));

    }



    @PutMapping({"/admin/rank/update"})
    public ResponseEntity<?> updateRank(@RequestBody Rank rank) {
        String message = rankService.updateRank(rank) ? "update thanh cong" : "update that bai";

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ResponeObject(message.equals("update thanh cong")
                        ? "success" : "Failed", message, message.equals("update that bai")
                        ? "" : rank));

    }
}
