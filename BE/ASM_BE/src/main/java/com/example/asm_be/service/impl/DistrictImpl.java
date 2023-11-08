package com.example.asm_be.service.impl;

import com.example.asm_be.entities.Address;
import com.example.asm_be.entities.District;
import com.example.asm_be.repositories.AddressRepository;
import com.example.asm_be.repositories.DistrictRepository;
import com.example.asm_be.service.AddressService;
import com.example.asm_be.service.DistrictService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.UUID;

@Component
public class DistrictImpl implements DistrictService {
    @Autowired
    private DistrictRepository districtRepository;
    @Override
    public List<District> getAll() {
        return districtRepository.findAll();
    }

    @Override
    public District getOne(int id) {
        return districtRepository.findById(id).get();
    }

    @Override
    public District save(District district) {
        return districtRepository.save(district);
    }

    @Override
    public District update(District district) {
        return districtRepository.save(district);
    }

    @Override
    public void delete(District district) {
        districtRepository.delete(district);
    }
}
