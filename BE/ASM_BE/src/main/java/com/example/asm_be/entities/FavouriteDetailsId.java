package com.example.asm_be.entities;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Embeddable
public class FavouriteDetailsId implements Serializable {
    @ManyToOne
    @JoinColumn(name = "danh_sach_id")
    private FavouriteList favouriteList;
    @ManyToOne
    @JoinColumn(name = "chi_tiet_san_pham_id")
    private ProductDetail productDetail;
}
