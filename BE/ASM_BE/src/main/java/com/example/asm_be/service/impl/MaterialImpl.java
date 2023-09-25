package com.example.asm_be.service.impl;

import com.example.asm_be.entities.Address;
import com.example.asm_be.entities.Material;
import com.example.asm_be.repositories.AddressRepository;
import com.example.asm_be.repositories.MaterialRepository;
import com.example.asm_be.service.AddressService;
import com.example.asm_be.service.MaterialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.UUID;

@Component
public class MaterialImpl implements MaterialService {
    @Autowired
    private MaterialRepository materialRepository;
    @Override
    public List<Material> getAll() {
        return materialRepository.findAll();
    }

    @Override
    public Material getOne(int id) {
        return materialRepository.findById(id).get();
    }

    @Override
    public Material save(Material material) {
        return materialRepository.save(material);
    }

    @Override
    public Material update(Material material) {
        return materialRepository.save(material);
    }

    @Override
    public void delete(Material material) {
        materialRepository.delete(material);
    }
}
