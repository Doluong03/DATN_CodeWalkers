package com.example.asm_be.service.impl;

import com.example.asm_be.entities.Category;
import com.example.asm_be.entities.Material;
import com.example.asm_be.repositories.MaterialRepository;
import com.example.asm_be.service.MaterialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class MaterialImpl implements MaterialService {
@Autowired
private MaterialRepository materialRepository;

    @Override
    public Page<Material> getAllPage(Integer pageNo,Integer sizePage) {
        Pageable pageable = PageRequest.of(pageNo,sizePage);
        return materialRepository.findAll(pageable);
    }
    @Override
    public List<Material> getAll() {
        return materialRepository.findAll();
    }

    @Override
    public Material getOne(int id) {

        return materialRepository.findById(id).get();
    }

    @Override
    public boolean save(Material material) {
        try {
            materialRepository.save(material);
            return true;
        } catch (Exception var3) {
            var3.getMessage();
            return false;
        }
    }

    @Override
    public boolean update(Material material) {
        try {
            this.materialRepository.save(material);
            return true;
        } catch (Exception var4) {
            var4.getMessage();
            return false;
        }
    }

    @Override
    public boolean delete(Integer idMaterial) {
        try {
            this.materialRepository.deleteById(idMaterial);
            return true;
        } catch (Exception var3) {
            var3.getMessage();
            return false;
        }
    }
}
