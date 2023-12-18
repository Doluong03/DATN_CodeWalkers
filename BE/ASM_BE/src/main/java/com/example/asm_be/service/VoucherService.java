package com.example.asm_be.service;

import com.example.asm_be.dto.VoucherUserDTO;
import com.example.asm_be.dto.VoucherUserDTO2;
import com.example.asm_be.entities.VoucherUsers;
import com.example.asm_be.entities.Vouchers;
import org.springframework.data.domain.Page;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public interface VoucherService {
//    List<Vouchers> getVouchersByUserName(String userName);

    Optional<Vouchers> getVouchersById(Integer id);

    Optional<Vouchers> getVouchersByMa(String maVc);

    public List<Vouchers> getVouchersByMaContain(String maVc);

    List<Vouchers> getAllVoucher();

    boolean addVoucher(Vouchers vouchers);

    boolean deleteVoucher(Integer idVc);

    boolean updateVoucher(Vouchers vouchers);

    Page<Vouchers> getPageVoucher(Integer pageNo,Integer pageSize);

    void turnOn(int id);

    void turnOff(int id);

    boolean saveVoucherUser(VoucherUsers voucherUsers);

    List<VoucherUserDTO> getOneUserVoucher(int id);

    Optional<Vouchers> getOneVoucher(int id);

    boolean updateUserVoucher(int usageCount , int id,int idUser);

    boolean deleteVoucherId(int id);

    boolean updateUserVouchers(VoucherUsers voucherUsers);

    Optional<VoucherUsers> findByUsersAndId(Integer id,Integer idVch);

    List<VoucherUserDTO2> getUserVouchersByVoucherAndUserName( int id,String userName);

    boolean updateQuantity( Integer quantity, Integer id);

    List<Integer> getListCusType(Integer idVc);

    Optional<Vouchers> getVoucherById (int idPhieu);

}
