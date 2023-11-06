package com.example.asm_be.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity(name = "SanPhamChiTiet")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "SanPhamChiTiet")
public class ProductDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id")
    private UUID id;
    @ManyToOne()
    @JoinColumn(name = "san_pham_id")
    private Product product;
    @ManyToOne()
    @JoinColumn(name = "thuong_hieu_id")
    private Brands brands;
    @ManyToOne()
    @JoinColumn(name = "phan_loai_id")
    private Category category;
    @ManyToOne()
    @JoinColumn(name = "chat_lieu_id")
    private Material material;
    @ManyToOne()
    @JoinColumn(name = "kich_thuoc_id")
    private Size size;
    @ManyToOne()
<<<<<<< Updated upstream
    @JoinColumn(name = "hinh_anh_id")
    private Image image;
    @Column(name = "so_luong_ton")
    private int quantity;
    @Column(name = "gia_Ban")
    private float price;
    @ManyToOne
    @JoinColumn(name = "trang_thai_id")
    private Status status;
=======
    @JoinColumn(name = "mau_sac_id")
    private Color color;
    @ManyToOne()
    @JoinColumn(name = "khuyen_mai_id")
    private Promotional promotional;

    @Column(name = "trang_thai")
    private boolean status;
>>>>>>> Stashed changes
}
