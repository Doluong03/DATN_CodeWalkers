package com.example.asm_be.service;

import com.example.asm_be.entities.BillDetails;
import com.example.asm_be.entities.ProductDetail;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
@Service
public interface ProductDetailService {

    public List<ProductDetail> getAll();

    public ProductDetail getOne(int id);

    public ProductDetail save(ProductDetail productDetail);

    public ProductDetail update(ProductDetail productDetail);

    public void delete(ProductDetail productDetail);

    public List<ProductDetail> getPrBetsSl();

    public List<ProductDetail> findByName(String keyWord);
    public List<ProductDetail> getSortedProducts();
    public List<ProductDetail> getSortedProducts_priceAsc();
    public List<ProductDetail> getSortedProducts_priceDesc();
    public void updateProductSize(int  productId, String newSize);
    public ProductDetail findBySize(int proId ,int sizeId);


}
