package com.example.asm_be.service;

import com.example.asm_be.entities.Product;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
@Service
public interface ProductService {

    List<Product> getAll();

    public Product getOne(int id);
    public Product save( Product product);
    public Product update( Product product);
    public void delete( Product product);

}
