package com.example.asm_be.entities;
<<<<<<< HEAD

=======
import com.fasterxml.jackson.annotation.JsonFormat;
>>>>>>> c03af29a89f0e9a53594ec285dfc58f7920aafc6
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
<<<<<<< HEAD

import java.util.Date;
import java.util.UUID;
=======
import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;
>>>>>>> c03af29a89f0e9a53594ec285dfc58f7920aafc6

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
<<<<<<< HEAD
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

=======
@Table(name = "NhanVien")
public class Staff implements Serializable {
    @Id
    @Column(name = "id_nhan_vien")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "ten_nhan_vien")
    private String name;
    @JsonFormat(pattern = "dd/MM/yyyy")
>>>>>>> c03af29a89f0e9a53594ec285dfc58f7920aafc6
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

<<<<<<< HEAD
    @Column(name = "can_cuoc")
    private String idCard;

    @Column(name = "mat_khau")
    private String password;

    @ManyToOne
    @JoinColumn(name = "trang_thai_id")
    private Status status;

=======
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
>>>>>>> c03af29a89f0e9a53594ec285dfc58f7920aafc6

}
