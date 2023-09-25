package com.example.asm_be.service.impl;

import com.example.asm_be.entities.Address;
import com.example.asm_be.entities.Category;
import com.example.asm_be.repositories.AddressRepository;
import com.example.asm_be.repositories.CategoryRepository;
import com.example.asm_be.service.AddressService;
import com.example.asm_be.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.UUID;

@Component
public class CategoryImpl implements CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;
    @Override
    public List<Category> getAll() {
        return categoryRepository.findAll();
    }

    @Override
    public Category getOne(int id) {
        return categoryRepository.findById(id).get();
    }

    @Override
    public Category save(Category category) {
        return categoryRepository.save(category);
    }

    @Override
    public Category update(Category category) {
        return categoryRepository.save(category);
    }

    @Override
    public void delete(Category category) {
        categoryRepository.delete(category);
    }
}
