package com.example.asm_be.repositories;

import com.example.asm_be.entities.Promotional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface Promotinonalrepository extends JpaRepository<Promotional,Integer> {
    @Query("SELECT p FROM KhuyenMai p WHERE p.status = :status ORDER BY p.createdDate DESC")
    List<Promotional> findAllByStatus(@Param("status") int status);

    @Query("SELECT p FROM KhuyenMai p WHERE p.name = :name ORDER BY p.createdDate DESC")
    List<Promotional> findAllByName(@Param("name") String name);

    @Query("SELECT p FROM KhuyenMai p WHERE p.typeDiscount LIKE %:type% ORDER BY p.createdDate DESC")
    List<Promotional> findAllByTypeDiscounts(@Param("type") String type);

    @Query("SELECT p FROM KhuyenMai p WHERE " +
            "(:status IS NULL OR p.status = :status) AND " +
            "(:name IS NULL OR p.name = :name) AND " +
            "(:type IS NULL OR p.typeDiscount LIKE %:type%) AND " +
            "(:date IS NULL OR p.startDate = :date) " +
            "ORDER BY p.createdDate DESC")
    List<Promotional> findAllByConditions(
            @Param("status") Integer status,
            @Param("name") String name,
            @Param("type") String type,
            @Param("date") Date date
    );


}
