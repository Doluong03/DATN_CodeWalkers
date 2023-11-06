package com.example.asm_be.service;

import com.example.asm_be.entities.Category;
import org.springframework.data.domain.Page;

public interface CategoryService {

    Page<Category> getAll(Integer pageNo,Integer sizePage);

    Category getOne(Integer id);
    boolean save( Category categoryRequest);
    boolean update( Category categoryRequest);
    boolean delete( Integer idCategory);

}
