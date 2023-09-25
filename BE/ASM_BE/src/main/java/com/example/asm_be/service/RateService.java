package com.example.asm_be.service;

import com.example.asm_be.entities.Rate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
@Service
public interface RateService {

    public List<Rate> getAll();

    public Rate getOne(int id);

    public Rate save(Rate rate);

    public Rate update(Rate rate);

    public void delete(Rate rate);

}
