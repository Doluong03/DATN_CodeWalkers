package com.example.asm_be.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.UUID;

@Entity(name = "HoaDon")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "HoaDon")
public class Bill {
    @Id
    @Column(name = "id_hoa_don")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "ma_hoa_don")
    private String code;

    @Column(name = "ghi_chu")
    private String moTa;
    @Column(name = "dia_chi_chi_tiet")
    private String diaChiChiTiet;
    @Column(name = "phuong_xa_id")
    private int phuongXa;
    @Column(name = "thanh_pho_id")
    private int thanhPho;
    @Column(name = "quan_huyen_id")
    private int quanHuyen;
    @Column(name = "ngay_giao")
    private Date ngayGiao;
    @Column(name = "phi_giao_hang")
    private Double phiGiaoHang;
    @Column(name = "tong_tien")
    private Double tongTien;
    @Column(name = "phuong_thuc")
    private int phuongThuc;

    @Column(name = "ngay_lap")
    private Date ngayLap;

    @ManyToOne
    @JoinColumn(name = "khach_hang_id")
    private Users users;

    @Column(name = "trang_thai")
    private boolean status;
    @ManyToOne
    @JoinColumn(name = "nguoi_lap_id")
    private Staff staff;
}
