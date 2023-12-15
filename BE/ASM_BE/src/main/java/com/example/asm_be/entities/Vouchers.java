package com.example.asm_be.entities;

import com.example.asm_be.dto.CustomDateSerializer;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;


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

//    @Column(name = "ngay_bat_dau")
//    private Date startDate;

    @Column(name = "ngay_ket_thuc")
    private Date endDate;

    @Column(name = "trang_thai")
    private boolean status;

    @Column(name = "hinh_anh")
    private String image;

    @Column(name = "hinh_thuc_ap_dung")
    private String useForm;

    @Column(name = "dieu_kien")
    private double condition;

    @Column(name = "giam_toi_da")
    private double maxReduction;

    @Column(name = "so_luong")
    private int quantity;

    @Column(name = "loai_giam_gia")
    private String discountType;

//    @Column(name = "loai_khach_hang")
//    private int customType;

    @Column(name = "diem_doi")
    private int exchangePoint;

    @Column(name = "cho_phep_doi")
    private boolean exchangeAllowed;


    @JsonIgnore
    @OneToMany(mappedBy = "voucher",cascade = CascadeType.REMOVE)
    private List<VoucherUsers> voucherUsages;
}