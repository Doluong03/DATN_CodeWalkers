package com.example.asm_be.service;

import com.example.asm_be.entities.CartDetails;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CartDetailService {

    public List<CartDetails> getAll();

    public CartDetails getOne(int id);
    public CartDetails save( CartDetails cartDetails);
    public CartDetails update( CartDetails cartDetails);
    public void delete( CartDetails cartDetails);



}
