package com.example.asm_be.service.impl;

import com.example.asm_be.dto.ProductFilterDTO;
import com.example.asm_be.entities.*;
import com.example.asm_be.repositories.ProductDetailRepository;
import com.example.asm_be.repositories.ProductRepository;
import com.example.asm_be.repositories.SizeRepository;
import com.example.asm_be.repositories.StatusRepository;
import com.example.asm_be.service.ProductDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

import java.util.stream.Collectors;


@Component
public class ProductDetailImpl implements ProductDetailService {
    @Autowired
    private ProductDetailRepository productDetailRepository;
    @Autowired
    private StatusRepository statusRepository;
    @Autowired
    private ProductRepository productRepository;

    @Override
    public List<ProductDetail> getAllDistinct() {
        return productDetailRepository.getAllDistinct();
    }

    @Override
    public List<ProductDetail> getAll() {
        return productDetailRepository.findAll();
    }

    @Override
    public Page<ProductDetail> getAllPage(Integer pageNo, Integer sizePage) {
        Pageable pageable = PageRequest.of(pageNo, sizePage, Sort.by(Sort.Order.desc("id")));
        return productDetailRepository.findAll(pageable);
    }

    @Override
    public ProductDetail getOne(int id) {
        return productDetailRepository.findById(id).get();
    }

    @Override
    public boolean save(ProductDetail productDetail) {
        try {
            // Check if a matching ProductDetail exists in the database
            Optional<ProductDetail> existingProductDetail = productDetailRepository.findBySizeIdAndColorIdAndProductId(
                    productDetail.getSize().getId(), productDetail.getColor().getId(), productDetail.getProduct().getId());

            if (existingProductDetail.isPresent()) {
                // Update the quantity if a matching ProductDetail exists
                ProductDetail productDetail1 = existingProductDetail.get();
                productDetail1.setQuantity(productDetail1.getQuantity() + productDetail.getQuantity());
                productDetail1.setPrice(productDetail.getPrice());
                productDetailRepository.save(productDetail1);
            } else {
                // Generate a new code for the ProductDetail
                String generatedCode = generateProductDetailCode(productDetail.getProduct().getId());

                // Set the new code to the ProductDetail
                productDetail.setCode(generatedCode);

                // Save the new ProductDetail to the database
                productDetailRepository.save(productDetail);
            }

            return true;
        } catch (Exception e) {
            e.printStackTrace(); // Log the exception instead of just printing the stack trace
            return false;
        }
    }

    private String generateProductDetailCode(int productId) {
        // Retrieve the product by ID
        Product product = productRepository.findById(productId).orElse(null);

        if (product != null) {
            // Retrieve existing product details for the product
            List<ProductDetail> productDetailList = productDetailRepository.findAll();

            // Find the max ID among existing product details
            Optional<ProductDetail> maxProduct = productDetailList.stream()
                    .max(Comparator.comparingInt(ProductDetail::getId));
            // Get the max ID or default to 0 if no existing product details
            int maxId = maxProduct.map(ProductDetail::getId).orElse(0);

            // Generate the new code based on the product's code and max ID
            return product.getCode() + "_" + (maxId + 1);
        }

        return null; // Handle the case where the product is not found
    }



    @Override
    public boolean update(ProductDetail product) {
        try {
            ProductDetail product1 = productDetailRepository.findById(product.getId()).get();
            product.setCode(product1.getCode());
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
    public List<ProductDetail> findByName(String keyWord) {
        List<ProductDetail> allProducts = productDetailRepository.getAllDistinct();
        List<ProductDetail> matchingProducts = new ArrayList<>();

        for (ProductDetail productDetail : allProducts) {
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
                matchingProducts.add(productDetail);
            }
        }
        return matchingProducts;
    }

    public List<ProductDetail> getSortedProducts(List<ProductDetail> detailsList, String sortBy) {
        // Sắp xếp danh sách dựa vào tham số sortBy
        List<ProductDetail> sortedList = detailsList.stream()
                .map(detail -> (ProductDetail) detail)  // Chỉ định kiểu của đối tượng
                .sorted(getComparator(sortBy))
                .collect(Collectors.toList());

        return sortedList;
    }

    private Comparator<ProductDetail> getComparator(String sortBy) {
        switch (sortBy) {
            case "nameAsc":
                return Comparator.comparing(detail -> detail.getProduct().getName());
            case "nameDesc":
                return Comparator.comparing(detail -> detail.getProduct().getName(), Comparator.reverseOrder());
            case "priceAsc":
                return Comparator.comparing(ProductDetail::getPrice);
            case "priceDesc":
                return Comparator.comparing(ProductDetail::getPrice).reversed();
            case "createAtAsc":
                return Comparator.comparing(ProductDetail::getCreatedAt);
            case "createAtDesc":
                return Comparator.comparing(ProductDetail::getCreatedAt).reversed();
            // Thêm các trường hợp sắp xếp khác nếu cần
            default:
                // Mặc định sắp xếp theo tên tăng dần
                return Comparator.comparing(detail -> detail.getProduct().getName());

        }
    }

    public List<ProductDetail> filterProductsByAttributes(ProductFilterDTO filterDTO) {
        List<ProductDetail> detailsList = productDetailRepository.findAll();
        List<ProductDetail> filteredProducts = new ArrayList<>(detailsList);
        // Lọc dựa trên kích thước
        if (filterDTO.getSizes() != null && !filterDTO.getSizes().isEmpty()) {
            filteredProducts = filteredProducts.stream()
                    .filter(product -> filterDTO.getSizes().contains(product.getSize() != null ? product.getSize().getId() : null))
                    .collect(Collectors.toList());
        }

        // Lọc dựa trên màu sắc
        if (filterDTO.getColors() != null && !filterDTO.getColors().isEmpty()) {
            filteredProducts = filteredProducts.stream()
                    .filter(product -> filterDTO.getColors().contains(product.getColor() != null ? product.getColor().getId() : null))
                    .collect(Collectors.toList());
        }

        // Lọc dựa trên chất liệu
        if (filterDTO.getMaterials() != null && !filterDTO.getMaterials().isEmpty()) {
            filteredProducts = filteredProducts.stream()
                    .filter(product -> filterDTO.getMaterials().contains(product.getMaterial() != null ? product.getMaterial().getId() : null))
                    .collect(Collectors.toList());
        }
        if (filterDTO.getBrands() != null && !filterDTO.getBrands().isEmpty()) {
            filteredProducts = filteredProducts.stream()
                    .filter(product -> filterDTO.getBrands().contains(product.getProduct() != null && product.getProduct().getBrands() != null ? product.getProduct().getBrands().getId() : null))
                    .collect(Collectors.toList());
        }

        // Lọc dựa trên danh mục
        if (filterDTO.getCategories() != null && !filterDTO.getCategories().isEmpty()) {
            filteredProducts = filteredProducts.stream()
                    .filter(product -> filterDTO.getCategories().contains(product.getProduct() != null && product.getProduct().getCategory() != null ? product.getProduct().getCategory().getId() : null))
                    .collect(Collectors.toList());
        }
        if (filterDTO.getMinPrice() != null) {
            filteredProducts = filteredProducts.stream()
                    .filter(product -> product.getPrice() >= filterDTO.getMinPrice())
                    .collect(Collectors.toList());
        }
        if (filterDTO.getMaxPrice() != null) {
            filteredProducts = filteredProducts.stream()
                    .filter(product -> product.getPrice() <= filterDTO.getMaxPrice())
                    .collect(Collectors.toList());
        }
        return filteredProducts;
    }

    @Override
    public ProductDetail findBySize(int proId, int sizeId, int idCl) {
        return productDetailRepository.findBySize(proId, sizeId, idCl);
    }

    @Override
    public List<ProductDetail> findByPrId(int proId) {
        return productDetailRepository.findByProductId(proId);
    }

    @Override
    public List<ProductDetail> getPrByColor(int idPr, int idColor) {
        return productDetailRepository.findByProductIdAndColorId(idPr, idColor);
    }

    @Override
    public List<ProductDetail> PRODUCT_DETAILS() {
        return productDetailRepository.findAll();
    }

    @Override
    public List<ProductDetail> findByProductName(String productName) {
        return productDetailRepository.findByProductName(productName);
    }

    @Override
    @Transactional
    public void turnOn(int id) {
        Optional<ProductDetail> optionalVoucher = productDetailRepository.findById(id);
        System.out.println(optionalVoucher.get().getStatus().getName() + "aaaaa");
        if (optionalVoucher.isPresent()) {
            ProductDetail productDetail = optionalVoucher.get();
            Status status = statusRepository.findById(1).get();
            System.out.println(productDetail.getStatus().getName() + "aaaaaaaaaaaaaa");
            productDetail.setStatus(status);
            productDetailRepository.save(productDetail);
        }
    }

    @Override
    @Transactional
    public void turnOff(int id) {
        try {
            Optional<ProductDetail> optionalVoucher = productDetailRepository.findById(id);
            System.out.println(optionalVoucher.get().getStatus().getName() + "aaaaa");
            ProductDetail productDetail = optionalVoucher.get();
            Status status = statusRepository.findById(2).get();
            productDetail.setStatus(status);
            System.out.println(productDetail.getStatus().getName() + "aaaaaaaaaaaaaa");
            productDetailRepository.save(productDetail);
        } catch (Exception e) {
            e.printStackTrace();
        }

    }


}
