package com.example.asm_be.service;

import com.example.asm_be.entities.Product;

import java.util.List;
import java.util.UUID;

public interface ProductService {

    public List<Product> getAll();

    public Product getOne(UUID id);
    public Product save( Product product);
    public Product update( Product product);
    public void delete( Product product);

}
