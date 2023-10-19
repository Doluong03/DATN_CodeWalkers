package com.example.asm_be.repositories;

import com.example.asm_be.entities.Bill;
import com.example.asm_be.entities.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartRepository extends JpaRepository<Cart, Integer> {
}
