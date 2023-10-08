package com.example.asm_be.repositories;

import com.example.asm_be.entities.Manufacture;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ManuFactureRepository extends JpaRepository<Manufacture,Integer> {
}
