package com.example.asm_be.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.UUID;

@Entity(name = "PhieuGiaoHang")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "PhieuGiaoHang")
public class DeliveryNote {
    @Id
    @Column(name = "id_phieu_giao")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "nguoi_nhan")
    private String recipient;

    @Column(name = "sdt_nguoi_nhan")
    private String recipientPhone;

    @Column(name = "nguoi_giao")
    private String shipper;

    @Column(name = "sdt_nguoi_giao")
    private String shipperPhone;

    @Column(name = "ngay_giao")
    private Date dateCreate;

    @Column(name = "ngay_nhan")
    private Date dateSuccess;

    @Column(name = "phi_giao_hang")
    private float fee;

    @Column(name = "mo_ta")
    private String description;

    @ManyToOne
    @JoinColumn(name = "hoa_don_id")
    private Bill bill;

    @ManyToOne
    @JoinColumn(name = "dia_chi_id")
    private Address address;

    @ManyToOne
    @JoinColumn(name = "trang_thai_id")
    private Status status;
}
