package com.example.asm_be.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name = "Phieu_KhachHang")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "Phieu_KhachHang")
public class VoucherUsers {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "khach_hang_id")
    private Users users;

    @ManyToOne
    @JoinColumn(name = "phieu_id")
    private Vouchers voucher;

    @Column(name = "so_luong_su_dung")
    private int usageCount;

    @Column(name = "trang_thai")
    private boolean status;



}
