package com.example.asm_be.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity(name = "DiaChi")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "DiaChi")
public class Address {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID Id;

    @Column(name = "dia_chi_chi_tiet")
    private String name;

    @ManyToOne
    @JoinColumn(name = "phuong_xa_id")
    private Commune commune;
    @ManyToOne
    @JoinColumn(name = "thanh_pho_id")
    private Province province;
    @ManyToOne
    @JoinColumn(name = "quan_huyen_id")
    private District district;
}
