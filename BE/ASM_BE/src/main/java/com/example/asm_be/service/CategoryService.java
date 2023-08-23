package com.example.asm_be.service;

import com.example.asm_be.entities.Category;

import java.util.List;
import java.util.UUID;

public interface CategoryService {

    public List<Category> getAll();

    public Category getOne(UUID id);
    public Category save( Category category);
    public Category update( Category category);
    public void delete( Category category);

}
