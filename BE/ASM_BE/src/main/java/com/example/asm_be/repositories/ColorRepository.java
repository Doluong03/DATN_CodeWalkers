package com.example.asm_be.repositories;

import com.example.asm_be.entities.Color;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ColorRepository extends JpaRepository<Color,Integer> {
}
