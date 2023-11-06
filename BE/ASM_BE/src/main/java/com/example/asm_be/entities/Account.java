package com.example.asm_be.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Entity()
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "TaiKhoan")
public class Account implements Serializable {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "user_name")
    private String userName;

    @Column(name = "password")
    private String password;

    @OneToOne
    @JoinColumn(name = "vai_tro_id")
    private Role role;


<<<<<<< Updated upstream:BE/ASM_BE/src/main/java/com/example/asm_be/entities/Account.java
=======
    @Column(name = "trang_thai")
    private boolean status;
>>>>>>> Stashed changes:BE/ASM_BE/src/main/java/com/example/asm_be/entities/Manufacture.java
}