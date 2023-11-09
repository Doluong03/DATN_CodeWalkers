package com.example.asm_be.repositories;

import com.example.asm_be.entities.Brands;
import com.example.asm_be.entities.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;
@Repository
public interface StatusRepository extends JpaRepository<Status, Integer> {
}
