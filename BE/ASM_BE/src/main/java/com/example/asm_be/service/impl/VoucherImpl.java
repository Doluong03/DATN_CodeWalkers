package com.example.asm_be.service.impl;

import com.example.asm_be.entities.Vouchers;
import com.example.asm_be.repositories.VoucherRepository;
import com.example.asm_be.service.VoucherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
@Component
public class VoucherImpl implements VoucherService {
    @Autowired
    VoucherRepository voucherRepository;
    @Override
    public List<Vouchers> getVouchersByUserName(String userName) {
        return voucherRepository.getVoucher(userName);
    }

    @Override
    public Optional<Vouchers> getVouchersById(Integer id) {
        return voucherRepository.findById(id);
    }
}
