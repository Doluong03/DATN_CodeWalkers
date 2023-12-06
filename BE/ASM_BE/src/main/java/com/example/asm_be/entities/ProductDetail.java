package com.example.asm_be.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Entity(name = "ChiTietSanPham")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Table(name = "ChiTietSanPham")
public class ProductDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_chi_tiet_san_pham")
    private int id;
    @Column(name = "so_luong_ton")
    private int quantity;
    @Column(name = "don_gia")
    private double price;
    @ManyToOne()
    @JoinColumn(name = "san_pham_id")
    private Product product;
    @ManyToOne()
    @JoinColumn(name = "chat_lieu_id")
    private Material material;

    @ManyToOne()
    @JoinColumn(name = "kich_co_id")
    private Size size;

    @ManyToOne()
    @JoinColumn(name = "mau_sac_id")
    private Color color;

    @ManyToOne
    @JoinColumn(name = "trang_thai")
    private Status status;

    @Column(name = "ngay_tao")
    private Date createdAt;




}
