package com.example.asm_be.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity(name = "ThanhPho")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "ThanhPho")
public class Province {
    @Id
    @Column(name = "id_thanh_pho")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int Id;
    @Column(name = "ma_thanh_pho")
    private String code;

    @Column(name = "ten_thanh_pho")
    private String name;

}
