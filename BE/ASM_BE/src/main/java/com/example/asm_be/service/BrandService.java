package com.example.asm_be.service;

import com.example.asm_be.entities.Brands;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
@Service
public interface BrandService {

    public List<Brands> getAll();

    public Brands getOne(int id);
    public Brands save( Brands brands);
    public Brands update( Brands brands);
    public void delete( Brands brands);

}
