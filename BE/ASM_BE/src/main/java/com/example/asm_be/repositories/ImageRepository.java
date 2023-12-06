package com.example.asm_be.repositories;

import com.example.asm_be.entities.Brands;
import com.example.asm_be.entities.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;
@Repository
public interface ImageRepository extends JpaRepository<Image, Integer> {
    @Query("SELECT i FROM HinhAnh i WHERE i.product IS NULL")
    List<Image> findAllByProductIsNull();
    List<Image> findAllByProductId(int id);
}
