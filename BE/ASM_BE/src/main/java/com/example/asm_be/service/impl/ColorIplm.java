package com.example.asm_be.service.impl;

import com.example.asm_be.entities.Color;
import com.example.asm_be.repositories.ColorRepository;
import com.example.asm_be.service.ColorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
@Component
public class ColorIplm implements ColorService {

    @Autowired
    private ColorRepository colorRepository;

    @Override
    public List<Color> getAll() {
        return colorRepository.findAll();
    }
}
