package com.example.asm_be.service;

import com.example.asm_be.entities.Size;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
@Service
public interface SizeService {

    public List<Size> getAll();

    public Size getOne(int id);

    public Size save(Size size);

    public Size update(Size size);

    public void delete(Size size);

    public Size findByName(String name);
}
