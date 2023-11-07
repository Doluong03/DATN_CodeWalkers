package com.example.asm_be.service.impl;

import com.example.asm_be.entities.Color;
import com.example.asm_be.repositories.ColorRepository;
import com.example.asm_be.service.ColorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ColorImpl implements ColorService {
    @Autowired
    private ColorRepository colorRepository;
    @Override
    public List<Color> getAll() {
        return colorRepository.findAll();
    }

    @Override
    public Color getOne(int id) {
        return colorRepository.findById(id).get();
    }

    @Override
    public Color save(Color color) {
        return colorRepository.save(color);
    }

    @Override
    public Color update(Color color) {
        return colorRepository.save(color);
    }

    @Override
    public void delete(Color color) {
        colorRepository.delete(color);
    }
}
