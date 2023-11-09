package com.example.asm_be.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity(name = "TrangThai")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "TrangThai")
public class Status {
    @Id
    @Column(name = "id_trang_thai")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int Id;

    @Column(name = "ten_trang_thai")
    private String name;

}
