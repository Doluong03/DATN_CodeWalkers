package com.example.asm_be.service.impl;

import com.example.asm_be.entities.Address;
import com.example.asm_be.entities.Size;
import com.example.asm_be.repositories.AddressRepository;
import com.example.asm_be.repositories.SizeRepository;
import com.example.asm_be.service.AddressService;
import com.example.asm_be.service.SizeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Component
public class SizeImpl implements SizeService {
    @Autowired
    private SizeRepository sizeRepository;

    @Override
    public Page<Size> getAllPage(Integer pageNo, Integer sizePage) {
        Pageable sizePageable = PageRequest.of(pageNo, sizePage);
        return sizeRepository.findAll(sizePageable);
    }

    @Override
    public List<Size> getAll() {
        return sizeRepository.findAll();
    }

    @Override
    public Size getOne(Integer idStaff) {
        return sizeRepository.getOne(idStaff);
    }

    @Override
    public boolean save(Size size) {
        try {
            sizeRepository.save(size);
            return true;
        } catch (Exception var3) {
            var3.getMessage();
            return false;
        }
    }

    @Override
    public boolean update(Size size) {
        try {
            this.sizeRepository.save(size);
            return true;
        } catch (Exception var4) {
            var4.getMessage();
            return false;
        }
    }

    @Override
    public boolean delete(Integer idSize) {
        try {
            this.sizeRepository.deleteById(idSize);
            return true;
        } catch (Exception var3) {
            var3.getMessage();
            return false;
        }
    }

    @Override
    public Optional<Size> findbyId(Integer idSize) {
        return Optional.empty();
    }

    @Override
    public Size findByName(String name) {
        return sizeRepository.findByName(name);
    }
}
