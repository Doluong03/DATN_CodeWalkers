package com.example.asm_be.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;
import java.util.List;

@Entity(name = "KhuyenMai")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "KhuyenMai")
public class Promotional {
    @Id
    @Column(name = "id_khuyen_mai")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "ten_khuyen_mai")
    private String name;

    @Column(name = "mo_ta_khuyen_mai")
    private String description;

    @Column(name = "loai_giam_gia")
    private String typeDiscount;

    @Column(name = "gia_tri")
    private double value;

    @Column(name = "ngay_bat_dau")
    private Date startDate;

    @Column(name = "ngay_ket_thuc")
    private Date endDate;

    @Column(name = "dieu_kien_giam")
    private double condition;

    @CreationTimestamp
    @Column(name = "ngay_tao", updatable = false)
    private Date createdDate;

    @Column(name = "trang_thai")
    private int status;

    @JsonManagedReference
    @OneToMany(mappedBy = "promotion", cascade = CascadeType.REMOVE)
    private List<PromotionDetails> promotionDetailsList;



}
