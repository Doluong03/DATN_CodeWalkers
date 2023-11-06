package com.example.asm_be.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.UUID;

@Entity(name = "SanPham")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "SanPham")
public class Product {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID Id;

    @Column(name = "ma_san_pham")
    private String code;

    @Column(name = "ten_san_pham")
    private String name;
<<<<<<< Updated upstream
    @Column(name = "created_at")
    private Date createdAt;
    @ManyToOne
    @JoinColumn(name = "trang_thai_id")
    private Status status;
=======

    @Column(name = "anh_chinh")
    private String mainImg;

    @Column(name = "mo_ta")
    private String description;

    @ManyToOne()
    @JoinColumn(name = "thuong_hieu_id")
    private Brands brands;

    @ManyToOne()
    @JoinColumn(name = "phan_loai_id")
    private Category category;

    @ManyToOne()
    @JoinColumn(name = "danh_gia_id")
    private Rate rate;

    @Column(name = "trang_thai")
    private boolean status;

    @OneToMany(mappedBy = "product" ,fetch = FetchType.LAZY)
    private List<Image> listImage;
>>>>>>> Stashed changes
}
