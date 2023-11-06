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
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID Id;

    @Column(name = "ma_phan_loai")
    private String code;

    @Column(name = "ten_phan_loai")
    private String name;
<<<<<<< Updated upstream
    @ManyToOne
    @JoinColumn(name = "trang_thai_id")
    private Status status;
=======

    @Column(name = "trang_thai")
    private boolean status;
>>>>>>> Stashed changes

}
