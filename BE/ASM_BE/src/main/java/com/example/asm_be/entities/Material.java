package com.example.asm_be.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity(name = "ChatLieu")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "ChatLieu")
public class Material {
    @Id
    @Column(name = "id_chat_lieu")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "ten_chat_lieu")
    private String name;

    @Column(name = "mo_ta")
    private String moTa;
    @Column(name = "trang_thai")
    private boolean status;

}
