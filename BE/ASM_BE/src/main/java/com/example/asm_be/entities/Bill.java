package com.example.asm_be.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity(name = "HoaDon")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "HoaDon")
public class Bill {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID Id;

    @Column(name = "ma_hoa_don")
    private String code;

    @Column(name = "phuong_thuc_thanh_toan")
    private String payment;

    @Column(name = "mo_ta")
    private String description;

    @Column(name = "created_at")
    private Date createdAt;

    @ManyToOne
    @JoinColumn(name = "khach_hang_id")
    private Users users;
<<<<<<< Updated upstream
    @ManyToOne
    @JoinColumn(name = "trang_thai_id")
    private Status status;
=======

    @Column(name = "trang_thai")
    private Boolean status;

    @ManyToOne
    @JoinColumn(name = "nguoi_lap_id")
    private Staff staff;
>>>>>>> Stashed changes
}
