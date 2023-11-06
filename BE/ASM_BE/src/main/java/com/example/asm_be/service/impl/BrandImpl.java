package com.example.asm_be.service.impl;

import com.example.asm_be.entities.Brands;
import com.example.asm_be.entities.Users;
import com.example.asm_be.repositories.BrandRepository;
import com.example.asm_be.service.BrandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import java.util.List;


@Component
public class BrandImpl implements BrandService {
    @Autowired
    private BrandRepository brandRepository;

    @Override
    public List<Brands> getAll() {
        return brandRepository.findAll();
    }

    @Override
    public Page<Brands> getAllPage(Integer pageNo, Integer sizePage) {
        Pageable pageable = PageRequest.of(pageNo,sizePage);
        return brandRepository.findAll(pageable);
    }

    public Brands getOne(Integer id) {
        return null;
    }

    public boolean save(Brands brands) {
        try {
            this.brandRepository.save(brands);
            return true;
        } catch (Exception var3) {
            var3.getMessage();
            return false;
        }
    }

    public boolean update( Brands brands) {
        try {
            this.brandRepository.save(brands);
            return true;
        } catch (Exception var4) {
            var4.getMessage();
            return false;
        }
    }

    public boolean delete(Integer idBrands) {
        try {
            this.brandRepository.deleteById(idBrands);
            return true;
        } catch (Exception var3) {
            var3.getMessage();
            return false;
        }

    }
}
