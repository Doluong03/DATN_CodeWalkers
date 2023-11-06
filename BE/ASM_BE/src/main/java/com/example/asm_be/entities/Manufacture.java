package com.example.asm_be.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Entity(name="SanXuat")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "SanXuat")
public class Manufacture implements Serializable {
    @Id
    @Column(name = "id_san_xuat")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "ten_san_xuat")
    private String name;

    @Column(name = "mo_ta")
    private String description;


    @Column(name = "trang_thai")
    private boolean status;
}

