package com.example.asm_be.service;

import com.example.asm_be.dto.PromotionDetailRespone;
import com.example.asm_be.entities.PromotionDetails;
import com.example.asm_be.entities.Promotional;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public interface PromotionService {
    Page<Promotional> getAll(Integer pageNo);

    boolean savePromotion(Promotional promotional);

    boolean savePromoTinDetails(PromotionDetails promotionDetails);

    List<Promotional> getAllActivePromotion();

    List<PromotionDetailRespone> findById(int id,int idProduct);

    boolean deletePromotion(int id);

    void turnOn(int id);

    void turnOff(int id);

    Optional<Promotional> findById(int id);

    boolean updatePromotion(Promotional promotional);

    boolean UpdateProDetai(Double discount, Integer idPro,Integer idProduct);

    boolean deleteProDetail(Integer idProductDetail,Integer idPro);

    boolean deleteAll(Integer idPro);

    List<Promotional> getAll();

    List<Promotional> findAllByName(String name);

    List<Promotional> findAllByTypeDiscounts( String type);

    List<Promotional> findAllByStatus(Integer status);


    List<Promotional> findAllByConditions(Integer status, String name, String type, Date date);

}
