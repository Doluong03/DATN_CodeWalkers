package com.example.asm_be.service.impl;


import com.example.asm_be.entities.*;
import com.example.asm_be.repositories.*;
import com.example.asm_be.service.CartDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
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
    @Autowired
    private StatusRepository statusRepository;

    @Override
    public List<CartDetails> findByCart(int id) {
        return cartDetailsRepository.findByCartId(id);
    }

    @Override
    public Optional<CartDetails> getOne(int id) {
        return cartDetailsRepository.findById(id);
    }

//    @Scheduled(fixedRate = 5000)
    public void checkQuantity() {
        List<ProductDetail> proDtList = productDetailRepository.findAll();
        for (ProductDetail x : proDtList) {
            if (x.getQuantity() > 0) {
                x.setStatus(statusRepository.findById(1).get());
                productDetailRepository.save(x);
            } else {
                x.setStatus(statusRepository.findById(2).get());
                productDetailRepository.save(x);
            }
        }
    }

    @Override
    public CartDetails save(CartDetails cartDetail) {
        cartDetail.setQuantity(1);
        ProductDetail productDetailOld = productDetailRepository.findById(cartDetail.getProductDetail().getId()).get();
        productDetailOld.setQuantity(productDetailOld.getQuantity() -1);
        productDetailRepository.save(productDetailOld);
        cartDetail.setStatus(1);
        return cartDetailsRepository.save(cartDetail);
    }


    @Override
    public CartDetails addOrUpdateCartItem(Cart cart, ProductDetail productDetail, int quantity) {
        Optional<CartDetails> cartDetailExist = cartDetailsRepository.findBy2Id(cart.getId(), productDetail.getId());
        if (cartDetailExist.isEmpty()) {
            CartDetails cartDetails = new CartDetails();
            cartDetails.setProductDetail(productDetail);
            cartDetails.setCart(cart);
            cartDetails.setQuantity(quantity);
            if(productDetail.getQuantity() - quantity<=0){
                productDetail.setQuantity(0);
                productDetail.setStatus(statusRepository.findById(2).get());
            }
            productDetail.setQuantity(productDetail.getQuantity() - quantity);
            productDetailRepository.save(productDetail);
            return cartDetailsRepository.save(cartDetails);
        } else {
            if ((cartDetailExist.get().getQuantity() + quantity) >= (cartDetailExist.get().getQuantity()+ productDetail.getQuantity())) {
                cartDetailExist.get().setQuantity(cartDetailExist.get().getQuantity() + productDetail.getQuantity());
                productDetail.setQuantity(0);
                productDetail.setStatus(statusRepository.findById(2).get());
                productDetailRepository.save(productDetail);
            } else {
                cartDetailExist.get().setQuantity(cartDetailExist.get().getQuantity() + quantity);
                productDetail.setQuantity(productDetail.getQuantity() - quantity);
                productDetailRepository.save(productDetail);
            }
            return cartDetailsRepository.save(cartDetailExist.get());
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
                            if (cartDetailsExist.getQuantity() + cartDetails.getQuantity() > (productDetail.getQuantity()+cartDetailsExist.getQuantity())) {
                                cartDetailsExist.setQuantity(productDetail.getQuantity()+cartDetailsExist.getQuantity());
                                productDetail.setQuantity(0);
                                productDetail.setStatus(statusRepository.findById(2).get());
                                productDetailRepository.save(productDetail);
                            } else {
                                cartDetailsExist.setQuantity(cartDetailsExist.getQuantity() + cartDetails.getQuantity());
                                productDetail.setQuantity(productDetail.getQuantity() - cartDetails.getQuantity());
                                productDetailRepository.save(productDetail);
                            }
                            ProductDetail productDetailOld = productDetailRepository.findById(cartDetails.getProductDetail().getId()).get();
                            productDetailOld.setQuantity(productDetailOld.getQuantity() + cartDetails.getQuantity());
                            productDetailOld.setStatus(statusRepository.findById(1).get());
                            productDetailRepository.save(productDetailOld);
                            cartDetailsRepository.save(cartDetailsExist);
                            // Xóa cartDetails cũ
                            cartDetailsRepository.delete(cartDetails);
                        } else {
                            // Nếu không tồn tại, cập nhật sản phẩm với kích thước mới
                            int quantity = cartDetails.getQuantity();
                            if (cartDetails.getQuantity() > productDetail.getQuantity()) {
                                cartDetails.setQuantity(productDetail.getQuantity());
                                productDetail.setQuantity(0);
                                productDetail.setStatus(statusRepository.findById(2).get());
                                productDetailRepository.save(productDetail);
                            }else {
                                productDetail.setQuantity(productDetail.getQuantity() - cartDetails.getQuantity());
                                productDetailRepository.save(productDetail);
                            }
                            ProductDetail productDetailOld = productDetailRepository.findById(cartDetails.getProductDetail().getId()).get();
                            productDetailOld.setQuantity(productDetailOld.getQuantity() + quantity);
                            productDetailOld.setStatus(statusRepository.findById(1).get());
                            productDetailRepository.save(productDetailOld);
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
            ProductDetail productDetailOld = productDetailRepository.findById(cartDetail.get().getProductDetail().getId()).get();
            productDetailOld.setQuantity(productDetailOld.getQuantity() + cartDetail.get().getQuantity());
            productDetailOld.setStatus(statusRepository.findById(1).get());
            productDetailRepository.save(productDetailOld);
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
            ProductDetail productDetailOld = productDetailRepository.findById(cartDetails.get().getProductDetail().getId()).get();
                int max = (productDetailOld.getQuantity() + cartDetails.get().getQuantity())-newQuantity ;
            if(max <=0){
                cartDetails1.setQuantity((productDetailOld.getQuantity() + cartDetails.get().getQuantity()));
                productDetailOld.setQuantity(0);
                productDetailOld.setStatus(statusRepository.findById(2).get());
                productDetailRepository.save(productDetailOld);
                cartDetailsRepository.save(cartDetails1); // Lưu lại sản phẩm cập nhật
                System.out.println("aaaaaaaaaaa");
            }else{
                System.out.println("bbbbbbbbbbbbbb");

                cartDetails1.setQuantity(newQuantity);
                productDetailOld.setQuantity(max);
                productDetailOld.setStatus(statusRepository.findById(1).get());
                productDetailRepository.save(productDetailOld);
                cartDetailsRepository.save(cartDetails1); // Lưu lại sản phẩm cập nhật

            }
        } else {
            throw new RuntimeException("Không tìm thấy sản phẩm với ID: " + productId);
        }
    }


}
