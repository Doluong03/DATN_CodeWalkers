package com.example.asm_be.service;

import com.example.asm_be.entities.Category;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import org.springframework.data.domain.Page;
@Service
public interface CategoryService {

    Page<Category> getAll(Integer pageNo,Integer sizePage);

    public Category getOne(int id);
    // public Category save( Category category);
    // public Category update( Category category);
    public void delete( Category category);

    Category getOne(Integer id);
    boolean save( Category categoryRequest);
    boolean update( Category categoryRequest);
    boolean delete( Integer idCategory);

}
