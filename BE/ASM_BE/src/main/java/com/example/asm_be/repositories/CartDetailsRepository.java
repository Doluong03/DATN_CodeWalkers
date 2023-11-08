package com.example.asm_be.repositories;

import com.example.asm_be.entities.CartDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartDetailsRepository extends JpaRepository<CartDetails, Integer> {
    @Query("select c from GioHangChiTiet c where c.cart.id =?1 and c.productDetail.id=?2")
    Optional<CartDetails> findBy2Id(int prId, int cartId);
    CartDetails findByProductDetailIdAndCartId(int id, int idcart);

    List<CartDetails> findByCartId(int id);

    Boolean deleteByCartId(int id);
}
