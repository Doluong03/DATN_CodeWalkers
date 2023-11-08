package com.example.asm_be.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Entity(name = "GioHang")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "GioHang")
public class Cart {
    @Id
    @Column(name = "id_gio_hang")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "ngay_tao")
    private Date createdAt;
    @Column(name = "ngay_sua")
    private Date updatedAt;

    @Column(name = "ghi_chu")
    private String description;

    @OneToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    @JoinColumn(name = "khach_hang_id")
    private Users users;

    @Column(name = "trang_thai")
    private int   status;
}
