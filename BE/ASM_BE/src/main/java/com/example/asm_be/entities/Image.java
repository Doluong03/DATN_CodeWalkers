package com.example.asm_be.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity(name = "HinhAnh")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "HinhAnh")
public class Image {
    @Id
    @Column(name = "id_hinh_anh")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int Id;

    @Column(name = "ten_hinh_anh")
    private String name;

    @Column(name = "link_hinh_anh")
    private String link;
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "san_pham_id")
    private Product product;


}
