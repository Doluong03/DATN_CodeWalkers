package com.example.asm_be.repositories;

import com.example.asm_be.entities.Brands;
import com.example.asm_be.entities.ProductDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.UUID;
@Repository
public interface ProductDetailRepository extends JpaRepository<ProductDetail, Integer> {
     List<ProductDetail> findByProductName(String productName);

     @Modifying
     @Query("UPDATE ChiTietSanPham t SET t.status.Id = 2 WHERE t.id = :id")
     void capNhatGiaTri(@PathVariable("id") Integer id);

}
