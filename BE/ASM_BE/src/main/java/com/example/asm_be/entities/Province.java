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
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID Id;

    @Column(name = "ma_thanh_pho")
    private String code;

    @Column(name = "ten_thanh_pho")
    private String name;

}
