package com.example.asm_be.service.impl;

import com.example.asm_be.entities.Address;
import com.example.asm_be.entities.Rate;
import com.example.asm_be.repositories.AddressRepository;
import com.example.asm_be.repositories.RateRepository;
import com.example.asm_be.service.AddressService;
import com.example.asm_be.service.RateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.UUID;

@Component
public class RateImpl implements RateService {
    @Autowired
    private RateRepository rateRepository;
    @Override
    public List<Rate> getAll() {
        return rateRepository.findAll();
    }

    @Override
    public Rate getOne(int id) {
        return rateRepository.findById(id).get();
    }

    @Override
    public Rate save(Rate rate) {
        return rateRepository.save(rate);
    }

    @Override
    public Rate update(Rate rate) {
        return rateRepository.save(rate);
    }

    @Override
    public void delete(Rate rate) {
        rateRepository.delete(rate);
    }
}
