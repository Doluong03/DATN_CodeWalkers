package com.example.asm_be.service.impl;

import com.example.asm_be.entities.Promotional;
import com.example.asm_be.repositories.Promotinonalrepository;
import com.example.asm_be.service.PromotionalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
@Component
public class PromotionalIplm implements PromotionalService {
    @Autowired
    private Promotinonalrepository promotinonalrepository;

    @Override
    public List<Promotional> getAll() {
        return promotinonalrepository.findAll();
    }
}
