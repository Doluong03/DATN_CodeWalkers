package com.example.asm_be.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name = "GioHangChiTiet")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "GioHangChiTiet")
public class CartDetails {
    @Id
    @Column(name = "id_gio_hang_chi_tiet")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id; // Đây là khóa chính kết hợp

    @ManyToOne
    @JoinColumn(name = "gio_hang_id")
    private Cart cart;
    @ManyToOne
    @JoinColumn(name = "chi_tiet_san_pham_id")
    private ProductDetail productDetail;
    @Column(name = "so_luong")
    private int quantity;

    @Column(name = "ghi_chu")
    private String description;

    @Column(name = "trang_thai")
    private int   status;


}
