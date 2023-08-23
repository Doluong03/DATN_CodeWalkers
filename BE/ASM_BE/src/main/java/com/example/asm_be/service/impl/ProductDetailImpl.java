package com.example.asm_be.service.impl;

import com.example.asm_be.entities.Product;
import com.example.asm_be.entities.ProductDetail;
import com.example.asm_be.repositories.ProductDetailRepository;
import com.example.asm_be.repositories.ProductRepository;
import com.example.asm_be.service.ProductDetailService;
import com.example.asm_be.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.UUID;

@Component
public class ProductDetailImpl implements ProductDetailService {
    @Autowired
    private ProductDetailRepository productDetailRepository;
    @Override
    public List<ProductDetail> getAll() {
        return productDetailRepository.findAll();
    }

    @Override
    public ProductDetail getOne(UUID id) {
        return productDetailRepository.findById(id).get();
    }

    @Override
    public ProductDetail save(ProductDetail product) {
        return productDetailRepository.save(product);
    }

    @Override
    public ProductDetail update(ProductDetail product) {
        return productDetailRepository.save(product);
    }

    @Override
    public void delete(ProductDetail product) {
        productDetailRepository.delete(product);
    }
}
