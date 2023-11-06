package com.example.asm_be.service.impl;

import com.example.asm_be.entities.Category;
import com.example.asm_be.entities.Color;
import com.example.asm_be.repositories.CategoryRepository;

import com.example.asm_be.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class CategoryImpl implements CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public Category getOne(int id) {
        return categoryRepository.findById(id).get();
    }

    @Override
    public Page<Category> getAllPage(Integer pageNo, Integer sizePage) {
        Pageable pageable = PageRequest.of(pageNo, sizePage);
        return categoryRepository.findAll(pageable);
    }
    @Override
    public List<Category> getAll() {
        return categoryRepository.findAll();
    }

    @Override
    public boolean save(Category category) {
        try {
            categoryRepository.save(category);
            return true;
        } catch (Exception var3) {
            var3.getMessage();
            return false;
        }
    }

    @Override
    public boolean update(Category category) {
        try {
            this.categoryRepository.save(category);
            return true;
        } catch (Exception var4) {
            var4.getMessage();
            return false;
        }
    }

    @Override
    public boolean delete(Integer idCategory) {
        try {
            this.categoryRepository.deleteById(idCategory);
            return true;
        } catch (Exception var3) {
            var3.getMessage();
            return false;
        }
    }

}
