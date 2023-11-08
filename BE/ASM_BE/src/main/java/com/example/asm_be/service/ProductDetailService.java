package com.example.asm_be.service;

import com.example.asm_be.entities.BillDetails;
import com.example.asm_be.entities.Product;
import com.example.asm_be.entities.ProductDetail;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
@Service
public interface ProductDetailService {

    public Page<ProductDetail> getAllPage(Integer pageNo,Integer sizePage);

    public List<ProductDetail> getAll();

    public ProductDetail getOne(int id);

    public boolean save(ProductDetail productDetail);

    public boolean update(ProductDetail productDetail);

    public boolean delete(Integer idProductDt);

    public List<Product> getPrBetsSl();
    public List<Product> findByName(String keyWord);
    public List<ProductDetail> getSortedProducts();
    public List<ProductDetail> getSortedProducts_priceAsc();
    public List<ProductDetail> getSortedProducts_priceDesc();
    public List<ProductDetail> getPrByColor(int idPr, int idColor);
    public void updateProductSize(int  productId, String newSize);
    public ProductDetail  findBySize(int proId, int sizeId, int idCl);
    public List<ProductDetail> findByPrId(int proId);


}
