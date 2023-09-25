package com.example.asm_be.service.impl;

import com.example.asm_be.entities.Address;
import com.example.asm_be.entities.Brands;
import com.example.asm_be.repositories.AddressRepository;
import com.example.asm_be.repositories.BrandRepository;
import com.example.asm_be.service.AddressService;
import com.example.asm_be.service.BrandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.UUID;

@Component
public class BrandImpl implements BrandService {
    @Autowired
    private BrandRepository brandRepository;
    @Override
    public List<Brands> getAll() {
        return brandRepository.findAll();
    }

    @Override
    public Brands getOne(UUID id) {
        return brandRepository.findById(id).get();
    }

    @Override
    public Brands save(Brands brand) {
        return brandRepository.save(brand);
    }

    @Override
    public Brands update(Brands brand) {
        return brandRepository.save(brand);
    }

    @Override
    public void delete(Brands brand) {
        brandRepository.delete(brand);
    }
}
