package com.example.asm_be.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity(name = "PhieuGiamGia")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "PhieuGiamGia")
public class Vouchers {
    @Id
    @Column(name = "id_phieu")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "ma_phieu")
    private String code;

    @Column(name = "ten_phieu")
    private String name;

    @Column(name = "mo_ta")
    private String description;

    @Column(name = "gia_tri")
    private double value;

    @Column(name = "ngay_bat_dau")
    private Date startDate;

    @Column(name = "ngay_ket_thuc")
    private Date endDate;

    @Column(name = "trang_thai")
    private boolean status;

    @Column(name = "hinh_anh")
    private String image;

    @Column(name = "dieu_kien")
    private double condition;

    @Column(name = "giam_toi_da")
    private double maxReduction;

    @Column(name = "so_luong")
    private int quantity;

    @ManyToOne()
    @JoinColumn(name = "khach_hang_id")
    private Users users;
}