package com.example.asm_be.service.impl;

import com.example.asm_be.entities.VoucherUsers;
import com.example.asm_be.entities.Vouchers;
import com.example.asm_be.repositories.VoucherRepository;
import com.example.asm_be.repositories.VoucherUserRepository;
import com.example.asm_be.service.VoucherService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
@Component
public class VoucherImpl implements VoucherService {
    @Autowired
    VoucherRepository voucherRepository;
    @Autowired
    VoucherUserRepository voucherUserRepository;
//    @Override
//    public List<Vouchers> getVouchersByUserName(String userName) {
//        return voucherRepository.getVoucher(userName);
//    }

    @Override
    public Optional<Vouchers> getVouchersById(Integer id) {
        return voucherRepository.findById(id);
    }

    @Override
    public Optional<Vouchers> getVouchersByMa(String maVc) {
        return voucherRepository.getVouchersByCode(maVc);
    }

    @Override
    public List<Vouchers> getAllVoucher() {
        return voucherRepository.findAll();
    }

    @Override
    public boolean addVoucher(Vouchers vouchers) {
        try{
            voucherRepository.save(vouchers);
            return true;
        }catch (Exception e){
            e.getMessage();
            return false;
        }
    }

    @Override
    public boolean deleteVoucher(Integer idVc) {
        try{
         voucherRepository.deleteById(idVc);
            return true;
        }catch (Exception e){
            e.getMessage();
            return false;
        }
    }

    @Override
    public boolean updateVoucher(Vouchers vouchers) {
        try{
        voucherRepository.save(vouchers);
            return true;
        }catch (Exception e){
            e.getMessage();
            return false;
        }
    }

    @Override
    public Page<Vouchers> getPageVoucher(Integer pageNo, Integer pageSize) {
        Pageable pageable = PageRequest.of(pageNo,pageSize);
        return voucherRepository.findAll(pageable);
    }

    @Override
    public void turnOn(int id) {
        Optional<Vouchers> optionalVoucher = voucherRepository.findById(id);
        if (optionalVoucher.isPresent()) {
            Vouchers voucher = optionalVoucher.get();
            voucher.setStatus(true);
            voucherRepository.save(voucher);
        }
    }

    @Override
    public void turnOff(int id) {
        Optional<Vouchers> optionalVoucher = voucherRepository.findById(id);
        if (optionalVoucher.isPresent()) {
            Vouchers voucher = optionalVoucher.get();
            voucher.setStatus(false);
            voucherRepository.save(voucher);
        }
    }

    @Override
    public boolean saveVoucherUser(VoucherUsers voucherUsers) {
        try{
            voucherUserRepository.save(voucherUsers);
            return true;
        }catch (Exception e){
            e.getMessage();
            return false;
        }
    }

    @Override
    public Optional<Integer> getOneUserVoucher(int id) {
        return voucherRepository.getUserVouchersById(id);
    }

    @Override
    public Optional<Vouchers> getOneVoucher(int id) {
        return voucherRepository.findById(id);
    }

    @Override
    public boolean updateUserVoucher(int usageCount, int id) {
        try{
            voucherUserRepository.updateUserVoucher(usageCount,id);
            return true;
        }catch (Exception e){
            e.getMessage();
            return false;
        }
    }

    @Override
    public boolean deleteVoucherId(int id) {
        try{
            voucherUserRepository.deleteVoucherId(id);
            return true;
        }catch (Exception e){
            e.printStackTrace();
            return false;
        }
    }


}
