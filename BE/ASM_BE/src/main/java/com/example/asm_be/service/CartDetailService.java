package com.example.asm_be.service;

import com.example.asm_be.entities.Cart;
import com.example.asm_be.entities.CartDetails;
import com.example.asm_be.entities.ProductDetail;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public interface CartDetailService {

    public List<CartDetails> findByCart(int id);
//    public CartDetails getOne(int id);
    public CartDetails save( CartDetails cartDetails);
    public CartDetails update( CartDetails cartDetails, int PrId);
    public Boolean delete( int  productId,int  cartId);
    public Boolean deleteByCart( int cartId);
    public void updateProductQuantity(int  productId, int newQuantity);
    public void updateProductSize(int cartDetailsId, int idProduct,int colorId, String newSize ,String idCart);
    public void addOrUpdateCartItem(Cart cart, ProductDetail productDetail, int quantity);
    public void updateCart(List<CartDetails> list, int cartId);

}
