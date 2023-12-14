package com.example.asm_be.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name = "HangKhachHang")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "HangKhachHang")
public class Rank{
    @Id
    @Column(name = "id_hang")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "ten_hang")
    private String name;

    @Column(name = "mo_ta")
    private String description;

    @Column(name = "trang_thai")
    private boolean status;

    @Column(name = "diem_toi_thieu")
    private Integer minimumPoints;

}
