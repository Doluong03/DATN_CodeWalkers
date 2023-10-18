package com.example.asm_be.service.impl;

import com.example.asm_be.entities.ProductDetail;
import com.example.asm_be.entities.Size;
import com.example.asm_be.repositories.ProductDetailRepository;
import com.example.asm_be.repositories.SizeRepository;
import com.example.asm_be.service.ProductDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

@Component
public class ProductDetailImpl implements ProductDetailService  {
    @Autowired
    private ProductDetailRepository productDetailRepository;
    @Autowired
    private SizeRepository sizeRepository;

    @Override
    public List<ProductDetail> getAll() {
        return productDetailRepository.getAll();

    // @Override
    // public Page<ProductDetail> getAll(Integer pageNo,Integer sizePage) {
    //     Pageable pageable = PageRequest.of(pageNo,sizePage);
    //     return productDetailRepository.findAll(pageable);
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
        // List<ProductDetail> detailList = productDetailRepository.getAll();
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
    @Override
    public List<ProductDetail> findByName(String keyWord) {
        List<ProductDetail> allProductDetails = productDetailRepository.findAll();
        List<ProductDetail> matchingProductDetails = new ArrayList<>();

        for (ProductDetail productDetail : allProductDetails) {
            String[] keywords = keyWord.split(""); // Tách từng ký tự của từ khoá
            String productName = productDetail.getProduct().getName().toLowerCase();

            boolean isMatch = true;
            int keywordIndex = 0;
            for (char c : productName.toCharArray()) {
                if (keywordIndex < keywords.length && c == keywords[keywordIndex].charAt(0)) {
                    keywordIndex++;
                }
            }
            if (keywordIndex == keywords.length) {
                matchingProductDetails.add(productDetail);
            }
        }
        return matchingProductDetails;
    }
    public List<ProductDetail> getSortedProducts() {
        return productDetailRepository.findAllByOrderByProduct_NameAsc();
    }

    @Override
    public List<ProductDetail> getSortedProducts_priceAsc() {
        return productDetailRepository.findAllByOrderByPriceAsc();
    }

    @Override
    public List<ProductDetail> getSortedProducts_priceDesc() {
        return productDetailRepository.findAllByOrderByPriceDesc();
    }

    @Override
    public void updateProductSize(int productId, String newSize) {
            // Tìm sản phẩm theo ID
        Optional<ProductDetail> productOptional = productDetailRepository.findById(productId);
        Optional<Size> sizeOptional = Optional.ofNullable(sizeRepository.findByName(newSize));
        if (productOptional.isPresent()) {
            ProductDetail product = productOptional.get();
            // Cập nhật size của sản phẩm
            product.setSize(sizeOptional.get());
            productDetailRepository.save(product); // Lưu lại sản phẩm cập nhật
        } else {
            throw new RuntimeException("Không tìm thấy sản phẩm với ID: " + productId);
        }

    }

    @Override
    public ProductDetail findBySize(int proId, int sizeId) {
       return productDetailRepository.findBySize(proId, sizeId);
    }
}
