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
@Table(name = "nhanvien")
public class Staff {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "ma_nhan_vien")
    private String code;

    @Column(name = "ten_nhan_vien")
    private String name;

    @Column(name = "ten_dem_nhan_vien")
    private String middleName;

    @Column(name = "ho_nhan_vien")
    private String fName;

    @Column(name = "ngay_sinh")
    private Date dateOfBirth;

    @Column(name = "so_dien_thoai")
    private String phoneNumber;

    @Column(name = "gioi_tinh")
    private Boolean gender;

    @Column(name = "dia_chi")
    private String address;

    @Column(name = "email")
    private String email;

    @Column(name = "can_cuoc")
    private String idCard;

    @Column(name = "mat_khau")
    private String password;

    @ManyToOne
    @JoinColumn(name = "trang_thai_id")
    private Status status;


}
