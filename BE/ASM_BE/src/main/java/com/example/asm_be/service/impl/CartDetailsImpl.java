package com.example.asm_be.service.impl;

import com.example.asm_be.entities.Cart;
import com.example.asm_be.entities.CartDetails;
import com.example.asm_be.repositories.CartDetailsRepository;
import com.example.asm_be.repositories.CartRepository;
import com.example.asm_be.service.CartDetailService;
import com.example.asm_be.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class CartDetailsImpl implements CartDetailService {
    @Autowired
    private CartDetailsRepository cartDetailsRepository;
    @Override
    public List<CartDetails> getAll() {
        return cartDetailsRepository.findAll();
    }

    @Override
    public CartDetails getOne(int id) {
        return cartDetailsRepository.findById(id).get();
    }

    @Override
    public CartDetails save(CartDetails cartDetail) {
        cartDetail.setQuantity(1);
        cartDetail.setStatus(1);
        return cartDetailsRepository.save(cartDetail);
    }

    @Override
    public CartDetails update(CartDetails cartDetail) {
        return cartDetailsRepository.save(cartDetail);
    }

    @Override
    public void delete(CartDetails cartDetail) {
        cartDetailsRepository.delete(cartDetail);
    }
}
