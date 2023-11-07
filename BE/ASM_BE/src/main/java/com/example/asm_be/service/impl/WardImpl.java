package com.example.asm_be.service.impl;

import com.example.asm_be.entities.Ward;
import com.example.asm_be.repositories.CommuneRepository;
import com.example.asm_be.service.WardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class WardImpl implements WardService {
    @Autowired
    private CommuneRepository communeRepository;
    @Override
    public List<Ward> getAll() {
        return communeRepository.findAll();
    }

    @Override
    public Ward getOne(int id) {
        return communeRepository.findById(id).get();
    }

    @Override
    public Ward save(Ward ward) {
        return communeRepository.save(ward);
    }

    @Override
    public Ward update(Ward ward) {
        return communeRepository.save(ward);
    }

    @Override
    public void delete(Ward ward) {
        communeRepository.delete(ward);
    }
}
