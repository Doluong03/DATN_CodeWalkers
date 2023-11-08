package com.example.asm_be.service;

import com.example.asm_be.entities.Color;
import com.example.asm_be.entities.Users;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ColorService {
    public List<Color> getAll();

    Page<Color> getAllPage(Integer pageNo, Integer sizePage);

    Color getOne(Integer id);

    boolean save(Color color);

    boolean update(Color color);

    boolean delete(Integer idColor);
}
