package com.example.asm_be.service.impl;


import com.example.asm_be.entities.CartDetails;
import com.example.asm_be.entities.Product;
import com.example.asm_be.entities.ProductDetail;
import com.example.asm_be.entities.Size;
import com.example.asm_be.repositories.CartDetailsRepository;
import com.example.asm_be.repositories.CartRepository;
import com.example.asm_be.repositories.ProductDetailRepository;
import com.example.asm_be.repositories.SizeRepository;
import com.example.asm_be.service.CartDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.util.List;
import java.util.Optional;
@Component
public class CartDetailsImpl implements CartDetailService {
    @Autowired
    private CartDetailsRepository cartDetailsRepository;
    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private ProductDetailRepository productDetailRepository;
    @Autowired
    private SizeRepository sizeRepository;

    @Override
    public List<CartDetails> getAll() {
        return cartDetailsRepository.findAll();
    }

    @Override
    public Optional<CartDetails> finByID(int id) {
        return cartDetailsRepository.findById(id);
    }

    @Override
    public CartDetails finByIdPr(int id) {
        return cartDetailsRepository.findByProductDetailId(id);
    }

    @Override
    public CartDetails save(CartDetails cartDetail) {
        cartDetail.setQuantity(1);

        return cartDetailsRepository.save(cartDetail);
    }

    @Override
    public void addOrUpdateCartDetail(int id_gh, int id_sp, int id_size, CartDetails cartDetails) {
        ProductDetail productDetailCheck = productDetailRepository.findBySize(id_sp, id_size);
        CartDetails cartDetailExist = cartDetailsRepository.findByProductDetailId(productDetailCheck.getId());
        if (cartDetailExist == null) {
            cartDetails.setProductDetail(productDetailCheck);
            cartDetails.setCart(cartRepository.findById(id_gh).get());
            cartDetails.setQuantity(1);
            cartDetailsRepository.save(cartDetails);
        } else {
            cartDetailExist.setQuantity(cartDetailExist.getQuantity() + 1);
            cartDetailsRepository.save(cartDetailExist);
            System.out.println("->" + cartDetailExist.getQuantity());
        }
    }

    @Override
    public void updateProductSize(int id, int idPr, String newSize) {
        try {
            Optional<CartDetails> cartDetail = cartDetailsRepository.findById(id);
            if (cartDetail.isPresent()) {
                CartDetails cartDetailsOut = cartDetail.get();
                Optional<ProductDetail> outPr = productDetailRepository.findById(idPr);
                int idProduct = outPr.get().getProduct().getId();
                int idSize = sizeRepository.findByName(newSize).getId();
                ProductDetail productDetail = productDetailRepository.findBySize(idProduct, idSize);
                CartDetails cartDetailExist = cartDetailsRepository.findByProductDetailId(productDetail.getId());
                if (cartDetailExist == null) {
                    cartDetailsOut.setProductDetail(productDetail);
                    cartDetailsRepository.save(cartDetailsOut);
                } else {
                    cartDetailsRepository.delete(cartDetail.get());
                    cartDetailExist.setQuantity(cartDetailExist.getQuantity() + 1);
                    cartDetailsRepository.save(cartDetailExist);
                }
            } else {
                System.out.println("ko thay ->");
                // Xử lý trường hợp không tìm thấy CartDetails
            }
        } catch (Exception e) {
            // Xử lý lỗi
            System.out.println("Loi ->" + e);
        }
    }

    @Override
    public CartDetails update(CartDetails cartDetail, int PrId) {
        return cartDetailsRepository.save(cartDetail);
    }

    @Override
    public Boolean delete(int productId, int cartId) {
        Optional<CartDetails> cartDetail = cartDetailsRepository.findBy2Id(cartId, productId);
        if (cartDetail.isPresent()) {
            cartDetailsRepository.delete(cartDetail.get());
            return true;
        } else {
            return false;
        }
    }

    @Override
    public void updateProductQuantity(int productId, int newQuantity) {
        Optional<CartDetails> cartDetails = cartDetailsRepository.findById(productId);
        if (cartDetails.isPresent()) {
            CartDetails cartDetails1 = cartDetails.get();
            // Cập nhật size của sản phẩm
            cartDetails1.setQuantity(newQuantity);
            cartDetailsRepository.save(cartDetails1); // Lưu lại sản phẩm cập nhật
        } else {
            throw new RuntimeException("Không tìm thấy sản phẩm với ID: " + productId);
        }
    }
}
