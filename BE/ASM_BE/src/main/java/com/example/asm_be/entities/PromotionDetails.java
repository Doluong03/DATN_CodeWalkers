package com.example.asm_be.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Entity(name = "ChiTietKhuyenMai")
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "ChiTietKhuyenMai")
public class PromotionDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "chi_tiet_san_pham_id")
    private ProductDetail productDetail;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "khuyen_mai_id")
    private Promotional promotion;

    @Column(name = "giam_gia")
    private float discount;

    @Column(name = "trang_thai")
    private boolean status;


}
