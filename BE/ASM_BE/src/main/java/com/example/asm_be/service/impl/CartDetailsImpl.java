package com.example.asm_be.service.impl;


import com.example.asm_be.entities.*;
import com.example.asm_be.repositories.CartDetailsRepository;
import com.example.asm_be.repositories.CartRepository;
import com.example.asm_be.repositories.ProductDetailRepository;
import com.example.asm_be.repositories.SizeRepository;
import com.example.asm_be.service.CartDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

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
    public List<CartDetails> findByCart(int id) {
        return cartDetailsRepository.findByCartId(id);
    }


    @Override
    public CartDetails save(CartDetails cartDetail) {
        cartDetail.setQuantity(1);
        cartDetail.setStatus(1);
        return cartDetailsRepository.save(cartDetail);
    }


    @Override
    public void addOrUpdateCartItem(Cart cart, ProductDetail productDetail, int quantity) {
        Optional<CartDetails> cartDetailExist = cartDetailsRepository.findBy2Id(cart.getId(), productDetail.getId());
        if (cartDetailExist.isEmpty()) {
            CartDetails cartDetails = new CartDetails();
            cartDetails.setProductDetail(productDetail);
            cartDetails.setCart(cart);
            cartDetails.setQuantity(quantity);
            cartDetailsRepository.save(cartDetails);
        } else {
            cartDetailExist.get().setQuantity(cartDetailExist.get().getQuantity() + quantity);
            cartDetailsRepository.save(cartDetailExist.get());
        }
    }

    @Override
    public void updateCart(List<CartDetails> list, int cartId) {
        Optional<Cart> cart = cartRepository.findById(cartId);
        for (CartDetails x : list) {
            x.setCart(cart.get());
            cartDetailsRepository.save(x);
        }
    }

    @Override
    public void updateProductSize(int cartDetailsId, int idProduct, int colorId, String newSize, String idCart) {
        try {
            // Tìm thông tin kích thước
            Size size = sizeRepository.findByName(newSize);

            if (size != null) {
                // Tìm thông tin sản phẩm
                System.out.println(idProduct + ":::" + size.getId());
                ProductDetail productDetail = productDetailRepository.findBySize(idProduct, size.getId(), colorId);

                if (productDetail != null) {
                    // Tìm chi tiết giỏ hàng theo ID
                    Optional<CartDetails> optionalCartDetails = cartDetailsRepository.findById(cartDetailsId);

                    if (optionalCartDetails.isPresent()) {
                        CartDetails cartDetails = optionalCartDetails.get();
                        // Kiểm tra xem sản phẩm có trong giỏ hàng chưa
                        CartDetails cartDetailsExist = cartDetailsRepository.findByProductDetailIdAndCartId(productDetail.getId(), Integer.valueOf(idCart));
                        if (cartDetailsExist != null) {
                            // Nếu đã tồn tại, tăng số lượng lên 1
                            cartDetailsExist.setQuantity(cartDetailsExist.getQuantity() + cartDetails.getQuantity());
                            cartDetailsRepository.save(cartDetailsExist);

                            // Xóa cartDetails cũ
                            cartDetailsRepository.delete(cartDetails);
                        } else {
                            // Nếu không tồn tại, cập nhật sản phẩm với kích thước mới
                            System.out.println("22222222222222222222222 ");
                            cartDetails.setProductDetail(productDetail);
                            cartDetailsRepository.save(cartDetails);
                        }
                    } else {
                        // Xử lý trường hợp không tìm thấy CartDetails theo ID
                        System.out.println("không tìm thấy CartDetails theo ID");
                    }
                } else {
                    // Xử lý trường hợp không tìm thấy ProductDetail tương ứng
                    System.out.println("không tìm thấy ProductDetail ");

                }
            } else {
                // Xử lý trường hợp không tìm thấy kích thước
                System.out.println("không tìm thấy kích thước ");

            }
        } catch (Exception e) {
            // Xử lý lỗi
            System.out.println("Lỗi: " + e);
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
    @Transactional
    public Boolean deleteByCart(int cartId) {
        try {
            cartDetailsRepository.deleteByCartId(cartId);
            return true;
        } catch (Exception e) {
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
