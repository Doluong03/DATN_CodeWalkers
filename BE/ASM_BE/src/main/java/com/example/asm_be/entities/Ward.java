package com.example.asm_be.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity(name = "PhuongXa")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "PhuongXa")
public class Ward {
    @Id
    @Column(name = "id_phuong_xa")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "ma_phuong_xa")
    private String code;

    @Column(name = "ten_phuong_xa")
    private String name;

    @ManyToOne
    @JoinColumn(name = "thanh_pho_id")
    private Province province;

    @ManyToOne
    @JoinColumn(name = "quan_huyen_id")
    private District district;

}
