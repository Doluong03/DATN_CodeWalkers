package com.example.asm_be.service.impl;

import com.example.asm_be.entities.Bill;
import com.example.asm_be.repositories.BillRepository;
import com.example.asm_be.repositories.BillRepository;
import com.example.asm_be.service.BillService;
import com.example.asm_be.service.BillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.UUID;

@Component
public class BillImpl implements BillService {
    @Autowired
    private BillRepository billRepository;
    @Override
    public List<Bill> getAll() {
        return billRepository.findAll();
    }

    @Override
    public Bill getOne(int id) {
        return billRepository.findById(id).get();
    }

    @Override
    public Bill save(Bill bill) {
        return billRepository.save(bill);
    }

    @Override
    public Bill update(Bill bill) {
        return billRepository.save(bill);
    }

    @Override
    public void delete(Bill bill) {
        billRepository.delete(bill);
    }
}
