package com.example.asm_be.service;

import com.example.asm_be.entities.VoucherUsers;
import com.example.asm_be.entities.Vouchers;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public interface VoucherService {
//    List<Vouchers> getVouchersByUserName(String userName);

    Optional<Vouchers> getVouchersById(Integer id);

    Optional<Vouchers> getVouchersByMa(String maVc);

    List<Vouchers> getAllVoucher();

    boolean addVoucher(Vouchers vouchers);

    boolean deleteVoucher(Integer idVc);

    boolean updateVoucher(Vouchers vouchers);

    Page<Vouchers> getPageVoucher(Integer pageNo,Integer pageSize);

    void turnOn(int id);

    void turnOff(int id);

    boolean saveVoucherUser(VoucherUsers voucherUsers);

    Optional<Integer> getOneUserVoucher(int id);

    Optional<Vouchers> getOneVoucher(int id);

    boolean updateUserVoucher(int usageCount , int id);

    boolean deleteVoucherId(int id);
}
