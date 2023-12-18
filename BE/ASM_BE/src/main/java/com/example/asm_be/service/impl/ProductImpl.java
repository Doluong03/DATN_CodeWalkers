package com.example.asm_be.service.impl;

import com.example.asm_be.entities.Color;
import com.example.asm_be.entities.Material;
import com.example.asm_be.entities.Product;
import com.example.asm_be.repositories.ProductRepository;
import com.example.asm_be.service.ProductService;
import org.apache.xmlbeans.impl.xb.xsdschema.Public;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

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
        Pageable pageable = PageRequest.of(pageNo, sizePage, Sort.by(Sort.Order.desc("id")));
        return productRepository.findAll(pageable);
    }


    @Override
    public Product getOne(Integer id) {
        return productRepository.findById(id).get();
    }


    @Override
    public Product save(Product product) {
        try {
            String codeRes = mapToAggregatedData(product);
            product.setCode(codeRes);
            return  this.productRepository.save(product);
        } catch (Exception var3) {
            var3.printStackTrace();
            return null;
        }
    }

    private String mapToAggregatedData(Product product) {
        String[] words = product.getName().split("\\s+");
        StringBuilder codeBuilder = new StringBuilder();

        for (String word : words) {
            if (!word.isEmpty()) {
                codeBuilder.append(word.charAt(0));
            }
        }

        List<Product> products = productRepository.findAll();

        Optional<Product> maxProduct = products.stream()
                .max(Comparator.comparingInt(Product::getId));
        Product productWithMaxId = maxProduct.orElse(null);

        if (productWithMaxId != null) {
            // Get the last three characters of the product code and add 1
            String lastThreeChars = productWithMaxId.getCode()
                    .substring(Math.max(productWithMaxId.getCode().length() - 3, 0));

            // Convert to integer and add 1
            int incrementedValue = Integer.parseInt(lastThreeChars) + 1;

            // Format the incrementedValue with leading zeros
            String formattedIncrementedValue = String.format("%03d", incrementedValue);

            // Limit the result to 3 characters
            String result = codeBuilder.toString().substring(0, Math.min(codeBuilder.length(), 3)) + formattedIncrementedValue;

            // Remove leading zeros if incrementedValue reaches 100
            if (incrementedValue >= 100) {
                result = result.replaceAll("^0+", "");
            }

            return result;
        } else {
            return ""; // Handle the case when no products are found
        }
    }


    @Override
    public boolean update(Product product) {
        try {
            Product product1 = productRepository.findById(product.getId()).get();
            product.setCode(product1.getCode());
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
    @Override
    public void switchStatus(Integer id) {
        Optional<Product> optinalBrand = productRepository.findById(id);
        if (optinalBrand.isPresent()) {
            Product product = optinalBrand.get();
            product.setStatus(!product.isStatus());
            productRepository.save(product);
        }
    }
}
