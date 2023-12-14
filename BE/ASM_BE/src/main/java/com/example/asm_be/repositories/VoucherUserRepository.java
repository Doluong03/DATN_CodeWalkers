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
import java.util.Optional;

@Repository
public interface VoucherUserRepository extends JpaRepository<VoucherUsers, Integer> {

    @Transactional
    @Modifying
    @Query("update Phieu_KhachHang p set p.usageCount = :usageCount where p.voucher.id = :id and p.users.id = :idUser")
    void updateUserVoucher(@Param("usageCount") Integer usageCount,
                              @Param("id") Integer id,@Param("idUser") Integer idUser);

    @Transactional
    @Modifying
    @Query("delete from Phieu_KhachHang p where p.voucher.id = :id")
    Integer deleteVoucherId(@Param("id") Integer id);


    @Query("select p from Phieu_KhachHang p where p.users.id = :id and p.id = :idVc")
    Optional<VoucherUsers> findByUsersId(@Param("id") Integer id,@Param("idVc") Integer idVc);

    @Query("select p.customType from Phieu_KhachHang p where p.voucher.id = :idVc")
    List<Integer> getListCusType(@Param("idVc") Integer idVc);
}
