package com.example.asm_be.entities;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name = "YeuThichChiTiet")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "YeuThichChiTiet")
public class FavouriteDetails {

    @EmbeddedId
    private FavouriteDetailsId id;

    @Column(name = "ghi_chu")
    private String description;

    @Column(name = "trang_thai")
    private int   status;


}
