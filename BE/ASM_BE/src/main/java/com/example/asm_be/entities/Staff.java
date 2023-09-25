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
@Table(name = "NhanVien")
public class Staff {
    @Id
    @Column(name = "id_nhan_vien")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "ho_nhan_vien")
    private String fname;

    @Column(name = "ten_nhan_vien")
    private String name;

    @Column(name = "ngay_sinh")
    private Date dateOfBirth;

    @Column(name = "so_dien_thoai")
    private String phoneNumber;

    @Column(name = "gioi_tinh")
    private Boolean gender;

    @Column(name = "dia_chi")
    private String address;

    @Column(name = "email")
    private String Email;

    @Column(name = "mat_khau")
    private String password;

    @ManyToOne
    @JoinColumn(name = "trang_thai_id")
    private Status status;
}
