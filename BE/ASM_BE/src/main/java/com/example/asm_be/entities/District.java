package com.example.asm_be.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity(name = "QuanHuyen")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "QuanHuyen")
public class District {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "ma_quan_huyen")
    private String code;

    @Column(name = "ten_quan_huyen")
    private String name;

    @ManyToOne
    @JoinColumn(name = "thanh_pho_id")
    private Province province;

}
