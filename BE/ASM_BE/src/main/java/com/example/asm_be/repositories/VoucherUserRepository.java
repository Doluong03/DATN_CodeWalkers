package com.example.asm_be.repositories;

import com.example.asm_be.entities.VoucherUsers;
import com.example.asm_be.entities.Vouchers;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VoucherUserRepository extends JpaRepository<VoucherUsers, Integer> {

    @Transactional
    @Modifying
    @Query("update Phieu_KhachHang p set p.usageCount = :usageCount where p.voucher.id = :id")
    boolean updateUserVoucher(@Param("usageCount") Integer usageCount, @Param("id") Integer id);

    @Transactional
    @Modifying
    @Query("delete from Phieu_KhachHang p where p.voucher.id = :id")
    void deleteVoucherId(@Param("id") Integer id);



}
