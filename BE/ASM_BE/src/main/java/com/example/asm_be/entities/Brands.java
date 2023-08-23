package com.example.asm_be.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity(name = "ThuongHieu")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "ThuongHieu")
public class Brands {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID Id;

    @Column(name = "ma_thuong_hieu")
    private String code;

    @Column(name = "ten_thuong_hieu")
    private String name;

    @ManyToOne
    @JoinColumn(name = "trang_thai_id")
    private Status status;
}
