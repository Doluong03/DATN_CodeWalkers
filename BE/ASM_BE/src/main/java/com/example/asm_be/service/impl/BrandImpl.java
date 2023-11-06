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


@Component
public class BrandImpl implements BrandService {
    @Autowired
    private BrandRepository brandRepository;

    @Override
<<<<<<< Updated upstream
    public Brands getOne(UUID id) {
        return brandRepository.findById(id).get();
=======
    public Page<Brands> getAll(Integer pageNo, Integer sizePage) {
        Pageable pageable = PageRequest.of(pageNo,sizePage);
        return brandRepository.findAll(pageable);
>>>>>>> Stashed changes
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
