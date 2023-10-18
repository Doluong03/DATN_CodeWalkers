package com.example.asm_be.service.impl;

import com.example.asm_be.cache.DiaChiCache;
import com.example.asm_be.entities.Province;
import com.example.asm_be.repositories.ProvinceRepository;
import com.example.asm_be.response.BaseResponse;
import com.example.asm_be.response.ProvineResponse;
import com.example.asm_be.service.ProvinceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Component
public class ProvinceImpl implements ProvinceService {
    @Autowired
    private ProvinceRepository provinceRepository;

    @Override
    public List<Province> getAll() {
        return provinceRepository.findAll();
    }

    @Override
    public Province getOne(int id) {
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
