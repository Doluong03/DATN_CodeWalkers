package com.example.asm_be.service.impl;

import com.example.asm_be.entities.Address;
import com.example.asm_be.entities.Commune;
import com.example.asm_be.repositories.AddressRepository;
import com.example.asm_be.repositories.CommuneRepository;
import com.example.asm_be.service.AddressService;
import com.example.asm_be.service.CommuneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.UUID;

@Component
public class CommuneImpl implements CommuneService {
    @Autowired
    private CommuneRepository communeRepository;
    @Override
    public List<Commune> getAll() {
        return communeRepository.findAll();
    }

    @Override
    public Commune getOne(int id) {
        return communeRepository.findById(id).get();
    }

    @Override
    public Commune save(Commune commune) {
        return communeRepository.save(commune);
    }

    @Override
    public Commune update(Commune commune) {
        return communeRepository.save(commune);
    }

    @Override
    public void delete(Commune commune) {
        communeRepository.delete(commune);
    }
}
