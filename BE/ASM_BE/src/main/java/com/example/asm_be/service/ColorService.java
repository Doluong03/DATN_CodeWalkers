package com.example.asm_be.service;

import com.example.asm_be.entities.Color;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ColorService {
     List<Color> getAll();
}
