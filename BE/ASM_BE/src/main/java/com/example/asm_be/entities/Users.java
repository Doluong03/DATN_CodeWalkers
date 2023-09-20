package com.example.asm_be.entities;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.UUID;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "KhachHang")
public class Users {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "ma_dang_nhap")
    private String code;

    @Column(name = "ten_khach_hang")
    private String name;

    @Column(name = "ten_dem_khach_hang")
    private String middleName;

    @Column(name = "ho_khach_hang")
    private String fName;

    @Column(name = "ngay_sinh")
    private Date dateOfBirth;

    @Column(name = "so_dien_thoai")
    private String phoneNumber;

    @Column(name = "gioi_tinh")
    private Boolean gender;

    @ManyToOne
    @JoinColumn(name = "dia_chi_id")
    private Address address;

    @Column(name = "email")
    private String email;

    @Column(name = "mat_khau")
    private String password;

    @ManyToOne
    @JoinColumn(name = "trang_thai_id")
    private Status status;
}