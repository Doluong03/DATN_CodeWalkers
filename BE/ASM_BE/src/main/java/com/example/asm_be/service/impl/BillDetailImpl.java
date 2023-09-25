package com.example.asm_be.service.impl;

import com.example.asm_be.entities.Address;
import com.example.asm_be.entities.BillDetails;
import com.example.asm_be.repositories.AddressRepository;
import com.example.asm_be.repositories.BillDetailsRepository;
import com.example.asm_be.service.AddressService;
import com.example.asm_be.service.BillDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.UUID;

@Component
public class BillDetailImpl implements BillDetailService {
    @Autowired
    private BillDetailsRepository billDetailsRepository;
    @Override
    public List<BillDetails> getAll() {
        return billDetailsRepository.findAll();
    }

    @Override
    public BillDetails getOne(UUID id) {
        return billDetailsRepository.findById(id).get();
    }

    @Override
    public BillDetails save(BillDetails billDetail) {
        return billDetailsRepository.save(billDetail);
    }

    @Override
    public BillDetails update(BillDetails billDetail) {
        return billDetailsRepository.save(billDetail);
    }

    @Override
    public void delete(BillDetails billDetail) {
        billDetailsRepository.delete(billDetail);
    }
}
