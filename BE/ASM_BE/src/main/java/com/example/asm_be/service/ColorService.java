package com.example.asm_be.service;

import com.example.asm_be.entities.Color;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ColorService {
    public List<Color> getAll();
    public Color getOne(int id);
    public Color save( Color color);
    public Color update( Color color);
    public void delete( Color color);
}
