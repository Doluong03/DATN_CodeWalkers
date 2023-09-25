package com.example.asm_be.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity(name = "KichThuoc")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "KichCo")
public class Size {
    @Id
    @Column(name = "id_kich_co")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "ten_kich_co")
    private String name;
    @Column(name = "mo_ta")
    private String description;

    @ManyToOne
    @JoinColumn(name = "trang_thai_id")
    private Status status;
}
