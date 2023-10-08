package com.example.asm_be.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

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

    @Column(name = "ma_khuyen_mai")
    private String code;
    @Column(name = "ten_khuyen_mai")
    private String name;

    @Column(name = "mo_ta_khuyen_mai")
    private String description;
    @Column(name = "gia_tri")
    private double value;

    @Column(name = "ngay_bat_dau")
    private Date startDate;

    @Column(name = "ngay_ket_thuc")
    private Date endDate;

}
