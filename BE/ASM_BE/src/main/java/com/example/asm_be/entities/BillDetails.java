package com.example.asm_be.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.UUID;

@Entity(name = "HoaDonChiTiet")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "HoaDonChiTiet")
public class BillDetails {
    @Id
    @Column(name = "id_hoa_don_chi_tiet")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "so_luong")
    private int quantity;

    @Column(name = "don_gia")
    private double price;

    @Column(name = "mo_ta")
    private String description;

    @ManyToOne
    @JoinColumn(name = "hoa_don_id")
    @JsonBackReference
    private Bill bill;
    @ManyToOne
    @JoinColumn(name = "chi_tiet_san_pham_id")
    private ProductDetail productDetail;
}
