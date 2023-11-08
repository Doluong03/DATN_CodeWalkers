package com.example.asm_be.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity(name = "DanhSachYeuThich")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "DanhSachYeuThich")
public class FavouriteList {
    @Id
    @Column(name = "id_danh_sach")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "ngay_tao")
    private Date createdAt;

    @Column(name = "ngay_sua")
    private Date updatedAt;

    @Column(name = "ghi_chu")
    private String description;

    @ManyToOne()
    @JoinColumn(name = "khach_hang_id")
    private Users users;

    @Column(name = "trang_thai")
    private int   status;

}
