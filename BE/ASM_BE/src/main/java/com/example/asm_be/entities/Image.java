package com.example.asm_be.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity(name = "HinhAnh")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "HinhAnh")
public class Image {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID Id;

    @Column(name = "ma_hinh_anh")
    private String code;

    @Column(name = "anh_chinh")
    private String main;
    @Column(name = "anh_phu")
    private String cover;


}
