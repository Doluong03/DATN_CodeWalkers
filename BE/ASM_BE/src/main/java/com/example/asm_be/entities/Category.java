package com.example.asm_be.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity(name="PhanLoai")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "PhanLoai")
public class Category {
    @Id
    @Column(name = "id_phan_loai")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "ten_phan_loai")
    private String name;

    @Column(name = "trang_thai")
    private boolean status;

}
