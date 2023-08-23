package com.example.asm_be.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity(name="ChatLieu")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "ChatLieu")
public class Material {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID Id;

    @Column(name = "ma_chat_lieu")
    private String code;

    @Column(name = "ten_chat_lieu")
    private String name;
    @ManyToOne
    @JoinColumn(name = "trang_thai_id")
    private Status status;
}
