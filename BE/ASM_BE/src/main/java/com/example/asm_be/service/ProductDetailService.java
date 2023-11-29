package com.example.asm_be.service;

import com.example.asm_be.dto.ProductFilterDTO;
import com.example.asm_be.entities.BillDetails;
import com.example.asm_be.entities.Product;
import com.example.asm_be.entities.ProductDetail;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public interface ProductDetailService {

    public Page<ProductDetail> getAllPage(Integer pageNo, Integer sizePage);

    public List<ProductDetail> getAllDistinct();

    public List<ProductDetail> getAll();

    public ProductDetail getOne(int id);

    public boolean save(ProductDetail productDetail);

    public boolean update(ProductDetail productDetail);

    public boolean delete(Integer idProductDt);

    public List<ProductDetail> findByName(String keyWord);

    List<ProductDetail> getSortedProducts(List<ProductDetail> list ,String sortBy);

    public List<ProductDetail> getPrByColor(int idPr, int idColor);

    public ProductDetail findBySize(int proId, int sizeId, int idCl);

    public List<ProductDetail> findByPrId(int proId);

    public List<ProductDetail> PRODUCT_DETAILS();

    List<ProductDetail> findByProductName(String productName);

    public List<ProductDetail> filterProductsByAttributes(ProductFilterDTO filterDTO);
}
