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
@Table(name = "KichThuoc")
public class Size {
    @Id
    @Column(name = "Id")
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID Id;

    @Column(name = "ma_kich_thuoc")
    private String code;

    @Column(name = "ten_kich_thuoc")
    private String name;

    @ManyToOne
    @JoinColumn(name = "trang_thai_id")
    private Status status;
}
