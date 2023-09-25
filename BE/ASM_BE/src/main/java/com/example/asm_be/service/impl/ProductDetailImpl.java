package com.example.asm_be.service.impl;

import com.example.asm_be.entities.BillDetails;
import com.example.asm_be.entities.Product;
import com.example.asm_be.entities.ProductDetail;
import com.example.asm_be.repositories.ProductDetailRepository;
import com.example.asm_be.repositories.ProductRepository;
import com.example.asm_be.service.ProductDetailService;
import com.example.asm_be.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Iterator;
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
    public ProductDetail getOne(int id) {
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

    @Override
    public List<ProductDetail> getPrBetsSl() {
        List<ProductDetail> detailList = productDetailRepository.findAll();
        Iterator<ProductDetail> iterator = detailList.iterator();
        while (iterator.hasNext()) {
            ProductDetail x = iterator.next();
            if (x.getPrice() < 85) {
                iterator.remove(); // Loại bỏ phần tử không cần thiết
            }
        }
        return detailList;
    }


}
