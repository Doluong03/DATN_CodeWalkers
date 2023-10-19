package com.example.asm_be.service;

import com.example.asm_be.entities.Category;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
@Service
public interface CategoryService {

    public List<Category> getAll();

    public Category getOne(int id);
    public Category save( Category category);
    public Category update( Category category);
    public void delete( Category category);

}
