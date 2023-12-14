package com.example.asm_be.service.impl;

import com.example.asm_be.entities.Category;
import com.example.asm_be.entities.Color;
import com.example.asm_be.repositories.ColorRepository;
import com.example.asm_be.service.ColorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class ColorImpl implements ColorService {
    @Autowired
    private ColorRepository colorRepository;
    @Override
    public List<Color> getAll() {
        return colorRepository.findAll();
    }

    @Override
    public Page<Color> getAllPage(Integer pageNo, Integer sizePage) {
        Pageable pageable = PageRequest.of(pageNo, sizePage, Sort.by(Sort.Order.desc("id")));
        return colorRepository.findAll(pageable);
    }

    @Override
    public Color getOne(Integer id) {
        return null;
    }

    @Override
    public boolean save(Color color) {
        try {
            this.colorRepository.save(color);
            return true;
        } catch (Exception var3) {
            var3.getMessage();
            return false;
        }
    }

    @Override
    public boolean update(Color color) {
        try {
            this.colorRepository.save(color);
            return true;
        } catch (Exception var4) {
            var4.getMessage();
            return false;
        }
    }

    @Override
    public boolean delete(Integer idColor) {
        try {
            this.colorRepository.deleteById(idColor);
            return true;
        } catch (Exception var3) {
            var3.getMessage();
            return false;
        }
    }
    @Override
    public void switchStatus(Integer id) {
        Optional<Color> optinalBrand = colorRepository.findById(id);
        if (optinalBrand.isPresent()) {
            Color color = optinalBrand.get();
            color.setStatus(!color.isStatus());
            colorRepository.save(color);
        }
    }
}
