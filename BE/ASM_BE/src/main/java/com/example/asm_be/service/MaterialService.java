package com.example.asm_be.service;

import com.example.asm_be.entities.Material;

import java.util.List;
import java.util.UUID;

public interface MaterialService {

    public List<Material> getAll();

    public Material getOne(UUID id);

    public Material save(Material material);

    public Material update(Material material);

    public void delete(Material material);

}
