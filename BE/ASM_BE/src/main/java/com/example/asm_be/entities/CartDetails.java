package com.example.asm_be.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name = "GioHangChiTiet")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "GioHangChiTiet")
public class CartDetails {
    @EmbeddedId
    private CartDetailsId id; // Đây là khóa chính kết hợp

    @Column(name = "so_luong")
    private int quantity;

    @Column(name = "ghi_chu")
    private String description;

    @Column(name = "trang_thai")
    private int   status;


}
