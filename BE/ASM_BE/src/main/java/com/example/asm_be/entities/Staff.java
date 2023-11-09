package com.example.asm_be.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "NhanVien")
public class Staff implements Serializable {
    @Id
    @Column(name = "id_nhan_vien")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "ho_nhan_vien")
    private String ho;
    @Column(name = "ten_nhan_vien")
    private String name;

    @JsonFormat(pattern = "dd/MM/yyyy")
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

    @Column(name = "password")
    private String password; // xoa sau

    @Column(name = "user_name")
    private String userName;

    @Column(name = "trang_thai")
    private boolean status;

    @Column(name = "hinh_anh")
    private String image;

    @ManyToMany(fetch =  FetchType.EAGER,cascade = CascadeType.ALL)
    @JoinTable(name = "VaiTroNhanVien",
            joinColumns = @JoinColumn(name = "nhan_vien_id", referencedColumnName = "id_nhan_vien"),
            inverseJoinColumns = @JoinColumn(name = "vai_tro_id", referencedColumnName = "id")
    )
    private Set<Role> roles = new HashSet<>();
}