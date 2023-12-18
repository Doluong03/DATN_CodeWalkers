package com.example.asm_be.repositories;

import com.example.asm_be.dto.VoucherUserDTO;
import com.example.asm_be.dto.VoucherUserDTO2;
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
public interface VoucherRepository extends JpaRepository<Vouchers, Integer> {
    //    @Query("""
//            select vc from PhieuGiamGia vc
//            join Users u on vc.users.id = u.id
//            where u.userName = :username
//             """)
//    List<Vouchers> getVoucher(@Param("username") String username);
    @Query("SELECT v FROM PhieuGiamGia v WHERE LOWER(v.code) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    List<Vouchers> getVouchersByCodeContaining(@Param("searchTerm") String maVc);

    Optional<Vouchers> getVouchersByCode( String maVc);

    @Query("""
            select distinct new com.example.asm_be.dto.VoucherUserDTO(p.usageCount,p.customType,p.id)  from PhieuGiamGia vc
            join Phieu_KhachHang p on vc.id = p.voucher.id
            where vc.id = :id
             """)
    List<VoucherUserDTO> getUserVouchersById(@Param("id") int id);


    @Query("""
            select new com.example.asm_be.dto.VoucherUserDTO2(p.users.id,p.usageCount,pgg.quantity)
             from PhieuGiamGia pgg join Phieu_KhachHang p
                    on pgg.id = p.voucher.id
                    join Users kh on kh.id = p.users.id
                    where p.voucher.id = :id and kh.userName = :userName
             """)
    List<VoucherUserDTO2> getUserVouchersByVoucherAndUserName(@Param("id") int id, @Param("userName") String userName);


}