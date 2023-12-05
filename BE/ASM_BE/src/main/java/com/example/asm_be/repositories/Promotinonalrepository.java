package com.example.asm_be.repositories;

import com.example.asm_be.entities.Promotional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface Promotinonalrepository extends JpaRepository<Promotional,Integer> {
    @Query("SELECT p FROM KhuyenMai p WHERE p.status = :status ORDER BY p.createdDate DESC")
    List<Promotional> findAllByStatus(@Param("status") int status);
}
