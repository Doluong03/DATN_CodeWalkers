package com.example.asm_be.repositories;

import com.example.asm_be.entities.Staff;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface SatffRepository extends JpaRepository<Staff, UUID> {
}
