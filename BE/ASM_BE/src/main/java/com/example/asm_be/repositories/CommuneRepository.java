package com.example.asm_be.repositories;

import com.example.asm_be.entities.Ward;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommuneRepository extends JpaRepository<Ward, Integer> {
}
