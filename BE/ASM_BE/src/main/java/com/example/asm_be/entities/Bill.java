package com.example.asm_be.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.UUID;

@Entity(name = "HoaDon")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "HoaDon")
public class Bill {
    @Id
    @Column(name = "id_hoa_don")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "ma_hoa_don")
    private String code;

    @Column(name = "ghi_chu")
    private String description;

    @Column(name = "ngay_lap")
    private Date createdAt;

    @ManyToOne
    @JoinColumn(name = "khach_hang_id")
    private Users users;

    @ManyToOne
    @JoinColumn(name = "nguoi_lap_id")
    private Staff staff;
}
