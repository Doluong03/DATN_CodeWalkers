package com.example.asm_be.service;

import com.example.asm_be.entities.Province;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
@Service
public interface ProvinceService {

    public List<Province> getAll();

    public Province getOne(int id);

    public Province save(Province province);

    public Province update(Province province);

    public void delete(Province province);

}
