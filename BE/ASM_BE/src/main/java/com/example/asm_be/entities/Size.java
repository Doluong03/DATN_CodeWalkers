package com.example.asm_be.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity(name = "KichThuoc")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "KichCo")
public class Size {
    @Id
    @Column(name = "id_kich_co")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "ten_kich_co")
//    @NotBlank("Khong duoc de trong kich co")
    private String name;
    @Column(name = "mo_ta")
    private String description;

    @Column(name = "trang_thai")
//    @NotNull("Khong duoc de trong trang thai")
    private boolean status;
}
