package com.example.asm_be.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import jakarta.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

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

    @Column(name = "hinh_anh")
    private String image;

    @Column(name = "vai_tro")
    private String role;

    @Column(name = "password")
    private String password;

    @Column(name = "user_name")
    private String userName;


    @Column(name = "trang_thai")
    private boolean status;


    @OneToOne(mappedBy = "users", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private Cart cart;
}
