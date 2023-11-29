package com.example.asm_be.service;

import com.example.asm_be.entities.Vouchers;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public interface VoucherService {
    List<Vouchers> getVouchersByUserName(String userName);
    Optional<Vouchers> getVouchersById(Integer id);
}
