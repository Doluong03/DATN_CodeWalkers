package com.example.asm_be.service.impl;

import com.example.asm_be.entities.Color;
import com.example.asm_be.entities.Product;
import com.example.asm_be.repositories.ProductRepository;
import com.example.asm_be.service.ProductService;
import org.apache.xmlbeans.impl.xb.xsdschema.Public;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.UUID;

@Component
public class ProductImpl implements ProductService {
    @Autowired
    private ProductRepository productRepository;

    @Override
    public List<Product> getAll() {
        return productRepository.findAll();
    }

    @Override
    public Page<Product> getAllPage(Integer pageNo, Integer sizePage) {
        Pageable pageable = PageRequest.of(pageNo,sizePage);
        return productRepository.findAll(pageable);
    }

    @Override
    public Product getOne(Integer id) {
        return productRepository.findById(id).get();
    }


    @Override
    public boolean save(Product product) {
        try {
            this.productRepository.save(product);
            return true;
        } catch (Exception var3) {
            var3.printStackTrace();
            return false;
        }
    }

    @Override
    public boolean update(Product product) {
        try {
            this.productRepository.save(product);
            return true;
        } catch (Exception var4) {
            var4.getMessage();
            return false;
        }
    }

    @Override
    public boolean delete(Integer idProduct) {
        try {
            this.productRepository.deleteById(idProduct);
            return true;
        } catch (Exception var3) {
            var3.getMessage();
            return false;
        }
    }
}
