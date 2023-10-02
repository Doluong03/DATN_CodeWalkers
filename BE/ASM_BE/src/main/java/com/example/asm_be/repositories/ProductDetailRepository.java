package com.example.asm_be.repositories;

import com.example.asm_be.entities.Brands;
import com.example.asm_be.entities.ProductDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;
@Repository
public interface ProductDetailRepository extends JpaRepository<ProductDetail, Integer> {
    List<ProductDetail> findByProduct_NameContaining(String keyword);
    List<ProductDetail> findAllByOrderByProduct_NameAsc();
    List<ProductDetail> findAllByOrderByPriceAsc();
    List<ProductDetail> findAllByOrderByPriceDesc();
}
