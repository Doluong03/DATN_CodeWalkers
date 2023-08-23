package com.example.asm_be.service;

import com.example.asm_be.entities.Rate;

import java.util.List;
import java.util.UUID;

public interface RateService {

    public List<Rate> getAll();

    public Rate getOne(UUID id);

    public Rate save(Rate rate);

    public Rate update(Rate rate);

    public void delete(Rate rate);

}
