package com.example.asm_be.repositories;

import com.example.asm_be.entities.Vouchers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface VoucherRepository extends JpaRepository<Vouchers, Integer> {
    @Query("""
            select vc from PhieuGiamGia vc 
            join Users u on vc.users.id = u.id
            where u.userName = :username 
             """)
    List<Vouchers> getVoucher(@Param("username") String username);
}