package com.example.asm_be.service;

import com.example.asm_be.entities.Promotional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface PromotionalService {

     List<Promotional> getAll();
}
