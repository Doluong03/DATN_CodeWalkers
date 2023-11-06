package com.example.asm_be.service;

import com.example.asm_be.entities.Brands;
import com.example.asm_be.entities.Product;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
@Service
public interface ProductService {
    public List<Product> getAll();

    Page<Product> getAllPage(Integer pageNo, Integer sizePage);

    Product getOne(Integer id);

    boolean save( Product product);

    boolean update( Product product);

    boolean delete( Integer idProduct);

}
