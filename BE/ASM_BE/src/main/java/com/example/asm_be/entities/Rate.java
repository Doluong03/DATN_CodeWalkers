package com.example.asm_be.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.UUID;

@Entity(name = "DanhGia")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "DanhGia")
public class Rate {
    @Id
    @Column(name = "id_danh_gia")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int Id;

    @Column(name = "noi_dung")
    private String description;
    @Column(name = "danh_gia")
    private double point;
    @Column(name = "ngay_tao")
    private Date createdAt;
    @Column(name = "ngay_sua")
    private Date updatedAt;

    @ManyToOne
    @JoinColumn(name = "chi_tiet_san_pham_id")
    private ProductDetail productDetail;
    @ManyToOne
    @JoinColumn(name = "khach_hang_id")
    private Users users;

}
