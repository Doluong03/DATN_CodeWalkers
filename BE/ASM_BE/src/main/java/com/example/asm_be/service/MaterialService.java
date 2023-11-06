package com.example.asm_be.service;

import com.example.asm_be.entities.Material;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
@Service
public interface MaterialService {

    Page<Material> getAll(Integer pageNo,Integer sizePage);

    Material getOne(Integer id);

    boolean  save(Material material);

    boolean  update(Material material);

    boolean delete(Integer idMaterial);
}
