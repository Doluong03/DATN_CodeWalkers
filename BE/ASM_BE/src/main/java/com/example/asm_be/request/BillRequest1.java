package com.example.asm_be.request;

import com.example.asm_be.entities.Bill;
import com.example.asm_be.entities.Staff;
import com.example.asm_be.entities.Users;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BillRequest1 {
    private Integer id;
    private String code;
    private String moTa;
    private String diaChiChiTiet;
    private String phuongXa;
    private Integer thanhPho;
    private Integer quanHuyen;
    private Date ngayLap;
    private Date ngayGiao;
    private Double phiGiaoHang;
    private Double tongTien;
    private Integer phuongThuc;
    private Integer users;
    private Integer staff;
    private boolean status;


}
