package com.example.asm_be.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.UUID;

@Entity(name = "DanhGia")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "DanhGia")
public class Rate {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID Id;

    @Column(name = "ma_danh_gia")
    private String code;

    @Column(name = "noi_dung")
    private String description;
    @Column(name = "diem_danh_gia")
    private float point;
    @Column(name = "created_at")
    private Date createdAt;

    @ManyToOne
    @JoinColumn(name = "san_pham_id")
    private Product product;
    @ManyToOne
    @JoinColumn(name = "nguoi_dung_id")
    private Users users;

}
