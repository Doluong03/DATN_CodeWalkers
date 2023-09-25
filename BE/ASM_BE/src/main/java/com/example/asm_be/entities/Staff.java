//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

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
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.UUID;

@Entity
@Table(
        name = "nhanvien"
)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Staff {
    @Id
    @Column(
            name = "id"
    )
    @GeneratedValue(
            strategy = GenerationType.UUID)
    private UUID id;
    @Column(
            name = "ma_nhan_vien"
    )
    private String code;
    @Column(
            name = "ten_nhan_vien"
    )
    private String name;
    @Column(
            name = "ten_dem_nhan_vien"
    )
    private String middleName;
    @Column(
            name = "ho_nhan_vien"
    )
    private String fName;
    @Column(
            name = "ngay_sinh"
    )
    private Date dateOfBirth;
    @Column(
            name = "so_dien_thoai"
    )
    private String phoneNumber;
    @Column(
            name = "gioi_tinh"
    )
    private Boolean gender;
    @Column(
            name = "dia_chi"
    )
    private String address;
    @Column(
            name = "email"
    )
    private String email;
    @Column(name = "can_cuoc")
    private String idCard;
    @Column(name = "mat_khau")
    private String password;
    @ManyToOne
    @JoinColumn(name = "trang_thai_id")
    private Status status;


}
