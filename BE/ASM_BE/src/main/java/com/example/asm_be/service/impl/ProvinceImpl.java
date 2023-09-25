package com.example.asm_be.service.impl;

import com.example.asm_be.entities.Address;
import com.example.asm_be.entities.Province;
import com.example.asm_be.repositories.AddressRepository;
import com.example.asm_be.repositories.ProvinceRepository;
import com.example.asm_be.service.AddressService;
import com.example.asm_be.service.ProvinceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.UUID;

@Component
public class ProvinceImpl implements ProvinceService {
    @Autowired
    private ProvinceRepository provinceRepository;
    @Override
    public List<Province> getAll() {
        return provinceRepository.findAll();
    }

    @Override
    public Province getOne(UUID id) {
        return provinceRepository.findById(id).get();
    }

    @Override
    public Province save(Province province) {
        return provinceRepository.save(province);
    }

    @Override
    public Province update(Province province) {
        return provinceRepository.save(province);
    }

    @Override
    public void delete(Province province) {
        provinceRepository.delete(province);
    }
}
