package com.example.asm_be.service;

import com.example.asm_be.entities.ProductDetail;

import java.util.List;
import java.util.UUID;

public interface ProductDetailService {

    public List<ProductDetail> getAll();

    public ProductDetail getOne(UUID id);

    public ProductDetail save(ProductDetail productDetail);

    public ProductDetail update(ProductDetail productDetail);

    public void delete(ProductDetail productDetail);

}
