package com.example.asm_be.service.impl;

import com.example.asm_be.entities.Cart;
import com.example.asm_be.repositories.CartRepository;
import com.example.asm_be.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;

@Component
public class CartImpl implements CartService {
    @Autowired
    private CartRepository cartRepopsitory;
    @Override
    public List<Cart> getAll() {
        return cartRepopsitory.findAll();
    }

    @Override
    public Cart getOne(int id) {
        return cartRepopsitory.findById(id).get();
    }

    @Override
    public Cart save(Cart cart) {
        cart.setCreatedAt(new Date());
        cart.setDescription("Cart-Items");
        cart.setStatus(1);
        return cartRepopsitory.save(cart);
    }

    @Override
    public Cart update(Cart cart) {
        return cartRepopsitory.save(cart);
    }

    @Override
    public void delete(Cart cart) {
        cartRepopsitory.delete(cart);
    }
}
