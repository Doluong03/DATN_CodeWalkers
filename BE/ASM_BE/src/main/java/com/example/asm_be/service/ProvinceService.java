package com.example.asm_be.service;

import com.example.asm_be.entities.Province;

import java.util.List;
import java.util.UUID;

public interface ProvinceService {

    public List<Province> getAll();

    public Province getOne(UUID id);

    public Province save(Province province);

    public Province update(Province province);

    public void delete(Province province);

}
