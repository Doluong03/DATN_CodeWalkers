package com.example.asm_be.service;

import com.example.asm_be.entities.Size;

import java.util.List;
import java.util.UUID;

public interface SizeService {

    public List<Size> getAll();

    public Size getOne(UUID id);

    public Size save(Size size);

    public Size update(Size size);

    public void delete(Size size);

}
