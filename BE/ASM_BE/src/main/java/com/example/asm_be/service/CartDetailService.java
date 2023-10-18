package com.example.asm_be.service;

import com.example.asm_be.entities.CartDetails;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public interface CartDetailService {

    public List<CartDetails> getAll();
//    public CartDetails getOne(int id);
    public Optional<CartDetails> finByID(int id);
    public CartDetails finByIdPr(int id);
    public CartDetails save( CartDetails cartDetails);
    public CartDetails update( CartDetails cartDetails, int PrId);
    public Boolean delete( int  productId,int  cartId);
    public void updateProductQuantity(int  productId, int newQuantity);
    public void updateProductSize(int id, int idPr, String newSize);
    public void addOrUpdateCartDetail(int id_gh, int id_sp, int id_size,CartDetails cartDetails);
}
