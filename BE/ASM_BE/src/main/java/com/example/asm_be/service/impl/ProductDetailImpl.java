package com.example.asm_be.service.impl;

import com.example.asm_be.entities.ProductDetail;
import com.example.asm_be.repositories.ProductDetailRepository;
import com.example.asm_be.service.ProductDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import java.util.Iterator;
import java.util.List;

@Component
public class ProductDetailImpl implements ProductDetailService {
    @Autowired
    private ProductDetailRepository productDetailRepository;

    @Override
    public Page<ProductDetail> getAll(Integer pageNo,Integer sizePage) {
        Pageable pageable = PageRequest.of(pageNo,sizePage);
        return productDetailRepository.findAll(pageable);
    }

    @Override
    public ProductDetail getOne(int id) {
        return productDetailRepository.findById(id).get();
    }

    @Override
    public boolean save(ProductDetail product) {
        try {
            productDetailRepository.save(product);
            return true;
        } catch (Exception var4) {
            var4.getMessage();
            return false;
        }
    }

    @Override
    public boolean update(ProductDetail product) {
        try {
            productDetailRepository.save(product);
            return true;
        } catch (Exception var4) {
            var4.getMessage();
            return false;
        }
    }

    @Override
    public boolean delete(Integer Idproduct) {
        try {
            productDetailRepository.deleteById(Idproduct);
            return true;
        } catch (Exception var4) {
            var4.getMessage();
            return false;
        }
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
