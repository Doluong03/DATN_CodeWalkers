package com.example.asm_be.service;

import com.example.asm_be.entities.Brands;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.List;
import java.util.UUID;

import com.example.asm_be.entities.Users;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;


@Service
public interface BrandService {
    public List<Brands> getAll();

    Page<Brands> getAllPage(Integer pageNo, Integer sizePage);

     Brands getOne(Integer id);

     boolean save( Brands brands);

     boolean update( Brands brands);

     boolean delete( Integer idBrand);

}
