package com.example.asm_be.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name = "MauSac")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "MauSac")
public class Color {
    @Id
    @Column(name = "id_mau_sac")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "ten_mau_sac")
    private String name;

    @Column(name = "trang_thai")
    private boolean status;
}
