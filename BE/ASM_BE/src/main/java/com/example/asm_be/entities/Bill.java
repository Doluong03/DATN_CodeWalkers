package com.example.asm_be.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Entity(name = "HoaDon")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name = "HoaDon")
public class Bill {
    @Id
    @Column(name = "id_hoa_don")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "ma_hoa_don")
    private String code;

    @Column(name = "ghi_chu")
    private String description;
    @Column(name = "dia_chi_chi_tiet")
    private String address;
    @Column(name = "phuong_xa_id")
    private String ward;
    @Column(name = "thanh_pho_id")
    private Integer province;
    @Column(name = "quan_huyen_id")
    private Integer  district;
    @Column(name = "ngay_giao")
    private Date shipDate;
    @Column(name = "phi_giao_hang")
    private Double fee;
    @Column(name = "tong_tien")
    private Double totalPay;
    @Column(name = "phuong_thuc")
    private int paymentOptions;

    @CreationTimestamp
    @Column(name = "ngay_lap", updatable = false)
    private Date createdAt;

    @ManyToOne
    @JoinColumn(name = "khach_hang_id")
    private Users users;

    @Column(name = "trang_thai")
    private int status;

    @ManyToOne
    @JoinColumn(name = "nguoi_lap_id")
    private Staff staff;

    @Column(name = "nguoi_nhan")
    private String userName;

    @Column(name = "sdt_nguoi_nhan")
    private String userPhone;

    @OneToMany(mappedBy = "bill", fetch = FetchType.EAGER)
    @JsonManagedReference
    private List<BillDetails> listBillDetail;

    @Column(name = "phieu_id")
    private int idPhieu;



}
