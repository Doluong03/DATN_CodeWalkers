package com.example.asm_be.service;

import com.example.asm_be.entities.Material;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
@Service
public interface MaterialService {

    Page<Material> getAllPage(Integer pageNo,Integer sizePage);
    List<Material> getAll();
    public Material getOne(int id);
    boolean  save(Material material);

    boolean  update(Material material);

    boolean delete(Integer idMaterial);
}
