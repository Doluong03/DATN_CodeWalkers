package com.example.asm_be.service;

import com.example.asm_be.entities.Brands;
import com.example.asm_be.entities.Product;
<<<<<<< Updated upstream
=======
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
>>>>>>> Stashed changes

import java.util.List;
import java.util.UUID;

public interface ProductService {

    Page<Product> getAll(Integer pageNo, Integer sizePage);

<<<<<<< Updated upstream
    public Product getOne(UUID id);
    public Product save( Product product);
    public Product update( Product product);
    public void delete( Product product);
=======
    Product getOne(Integer id);

    boolean save( Product product);

    boolean update( Product product);

    boolean delete( Integer idProduct);
>>>>>>> Stashed changes

}
