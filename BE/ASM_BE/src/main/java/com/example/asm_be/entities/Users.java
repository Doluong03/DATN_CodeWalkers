package com.example.asm_be.entities;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "KhachHang")
public class Users {
    @Id
    @Column(name = "id_khach_hang")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "ten_khach_hang")
    private String name;

    @JsonFormat(pattern = "dd/MM/yyyy")
    @Column(name = "ngay_sinh")
    private Date dateOfBirth;

    @Column(name = "ngay_tao")
    private Date createdDate;

    @Column(name = "ngay_sua")
    private Date modified;

    @Column(name = "so_dien_thoai")
    private String phoneNumber;

    @Column(name = "gioi_tinh")
    private Boolean gender;


    @Column(name = "email")
    private String email;

    @Column(name = "dia_chi")
    private String address;

    @Column(name = "hinh_anh")
    private String image;

    @ManyToOne
    @JoinColumn(name = "trang_thai_id")
    private Status status;

    @OneToOne
    @JoinColumn(name = "id_tai_khoan")
    private Account account;



}
