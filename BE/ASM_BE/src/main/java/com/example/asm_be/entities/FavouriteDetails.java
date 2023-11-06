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
    @Id
    @Column(name = "id_yeu_thich")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @ManyToOne
    @JoinColumn(name = "danh_sach_id")
    private FavouriteList favouriteList;
    @ManyToOne
    @JoinColumn(name = "chi_tiet_san_pham_id")
    private ProductDetail productDetail;
    @Column(name = "ghi_chu")
    private String description;
    @Column(name = "trang_thai")
    private int   status;

}
