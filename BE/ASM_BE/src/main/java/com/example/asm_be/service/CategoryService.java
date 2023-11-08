package com.example.asm_be.service;

import com.example.asm_be.entities.Category;
import com.example.asm_be.entities.Color;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import org.springframework.data.domain.Page;
@Service
public interface CategoryService {

    Page<Category> getAllPage(Integer pageNo,Integer sizePage);
    public List<Category> getAll();

    public Category getOne(int id);
    // public Category save( Category category);
    // public Category update( Category category);

    boolean save( Category categoryRequest);
    boolean update( Category categoryRequest);
    boolean delete( Integer idCategory);

}
