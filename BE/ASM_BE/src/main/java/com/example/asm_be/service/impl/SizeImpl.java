package com.example.asm_be.service.impl;

import com.example.asm_be.entities.Address;
import com.example.asm_be.entities.Size;
import com.example.asm_be.repositories.AddressRepository;
import com.example.asm_be.repositories.SizeRepository;
import com.example.asm_be.service.AddressService;
import com.example.asm_be.service.SizeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.UUID;

@Component
public class SizeImpl implements SizeService {
    @Autowired
    private SizeRepository sizeRepository;
    @Override
    public List<Size> getAll() {
        return sizeRepository.findAll();
    }

    @Override
    public Size getOne(UUID id) {
        return sizeRepository.findById(id).get();
    }

    @Override
    public Size save(Size size) {
        return sizeRepository.save(size);
    }

    @Override
    public Size update(Size size) {
        return sizeRepository.save(size);
    }

    @Override
    public void delete(Size size) {
        sizeRepository.delete(size);
    }
}
