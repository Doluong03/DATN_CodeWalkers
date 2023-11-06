package com.example.asm_be.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity(name = "ThuongHieu")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "ThuongHieu")
public class Brands {
    @Id
    @Column(name = "id_thuong_hieu")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "ten_thuong_hieu")
    private String name;

    @Column(name = "mo_ta")
    private String description;

    @Column(name = "trang_thai")
    private boolean status;
}
