package com.example.asm_be.service;

import com.example.asm_be.entities.Cart;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public interface CartService {

    public List<Cart> getAll();

    public Cart getOne(int id);
    public Cart save( Cart cart);
    public Cart update( Cart cart);
    public void delete( Cart cart);

}
