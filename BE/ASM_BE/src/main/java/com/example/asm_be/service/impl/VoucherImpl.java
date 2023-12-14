package com.example.asm_be.service.impl;

import com.example.asm_be.dto.VoucherUserDTO;
import com.example.asm_be.dto.VoucherUserDTO2;
import com.example.asm_be.entities.VoucherUsers;
import com.example.asm_be.entities.Vouchers;
import com.example.asm_be.repositories.VoucherRepository;
import com.example.asm_be.repositories.VoucherUserRepository;
import com.example.asm_be.service.VoucherService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
@Component
public class VoucherImpl implements VoucherService {
    @Autowired
    VoucherRepository voucherRepository;
    @Autowired
    VoucherUserRepository voucherUserRepository;


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
    @Transactional
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
        Sort sort = Sort.by(Sort.Order.desc("id"));
        Pageable pageable = PageRequest.of(pageNo,pageSize,sort);
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
    public List<VoucherUserDTO> getOneUserVoucher(int id) {
        return voucherRepository.getUserVouchersById(id);
    }

    @Override
    public Optional<Vouchers> getOneVoucher(int id) {
        return voucherRepository.findById(id);
    }

    @Override
    public boolean updateUserVoucher(int usageCount, int id,int idUser) {
        try{
            voucherUserRepository.updateUserVoucher(usageCount,id,idUser);
            return true;
        }catch (Exception e){
            e.printStackTrace();
            return false;
        }
    }

    @Override
    @Transactional
    public boolean deleteVoucherId(int id) {
        try{
            voucherUserRepository.deleteVoucherId(id);
            return true;
        }catch (Exception e){
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public boolean updateUserVouchers(VoucherUsers voucherUsers) {
        try{
            voucherUserRepository.save(voucherUsers);
            return true;
        }catch (Exception e){
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public Optional<VoucherUsers> findByUsersAndId(Integer id,Integer idVch) {
        return voucherUserRepository.findByUsersId(id,idVch);
    }

    @Override
    public List<VoucherUserDTO2> getUserVouchersByVoucherAndUserName(int id, String userName) {
        return voucherRepository.getUserVouchersByVoucherAndUserName(id,userName);
    }

    @Override
    public boolean updateQuantity(Integer quantity, Integer id) {
        try {
            Optional<Vouchers> vouchers = voucherRepository.findById(id);
            if (vouchers.isPresent()) {
                Vouchers vouchers1 = vouchers.get();
                vouchers1.setQuantity(quantity);
                voucherRepository.save(vouchers1);
            }
            return true;
        } catch (Exception Ex) {
            Ex.printStackTrace();
            return false;
        }
    }

    @Override
    public List<Integer> getListCusType(Integer idVc) {
        return voucherUserRepository.getListCusType(idVc);
    }


}
