package com.example.asm_be.service.impl;

import com.example.asm_be.dto.PromotionDetailRespone;
import com.example.asm_be.entities.PromotionDetails;
import com.example.asm_be.entities.Promotional;
import com.example.asm_be.entities.Vouchers;
import com.example.asm_be.repositories.Promotinonalrepository;
import com.example.asm_be.repositories.PromotionDetailRepository;
import com.example.asm_be.service.PromotionService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Component
public class PromotionIplm implements PromotionService {

    @Autowired
    private Promotinonalrepository promotinonalrepository;

    @Autowired
    private PromotionDetailRepository promotionDetailRepository;

    @Override
    public Page<Promotional> getAll(Integer pageNo) {
        Sort sort = Sort.by(Sort.Order.desc("createdDate"));
        Pageable pageable = PageRequest.of(pageNo, 10,sort);
        return promotinonalrepository.findAll(pageable);
    }

    @Override
    public boolean savePromotion(Promotional promotional) {
        try{
            promotinonalrepository.save(promotional);
            return true;
        }catch (Exception e){
             e.printStackTrace();
            return false;
        }

    }

    @Override
    public boolean savePromoTinDetails(PromotionDetails promotionDetails) {
        try{
           promotionDetailRepository.save(promotionDetails);
            return true;
        }catch (Exception e){
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public List<Promotional> getAllActivePromotion() {
        int activeStatus = 1; // Giả sử trạng thái hoạt động có giá trị là 1
        return promotinonalrepository.findAllByStatus(activeStatus);
    }

    @Override
    public List<PromotionDetailRespone> findById(int id,int idProduct) {
        return promotionDetailRepository.getPromotionDetail(id,idProduct);
    }

    @Override
    public boolean deletePromotion(int id) {
        try{
            promotinonalrepository.deleteById(id);
            return true;

        }catch (Exception ex){
             ex.printStackTrace();
             return false;
        }
    }

    @Override
    public void turnOn(int id) {
      Optional<Promotional> promotional = promotinonalrepository.findById(id);
      if (promotional.isPresent()){
           Promotional promotional1 = promotional.get();
           promotional1.setStatus(1);
           promotinonalrepository.save(promotional1);
      }
    }

    @Override
    public void turnOff(int id) {
        Optional<Promotional> promotional = promotinonalrepository.findById(id);
        if (promotional.isPresent()){
            Promotional promotional1 = promotional.get();
            promotional1.setStatus(0);
            promotinonalrepository.save(promotional1);
        }
    }

    @Override
    public Optional<Promotional> findById(int id) {
        return promotinonalrepository.findById(id);
    }

    @Override
    public boolean updatePromotion(Promotional promotional) {
        try{
            promotinonalrepository.save(promotional);
            return true;

        }catch (Exception ex){
            ex.printStackTrace();
            return false;
        }
    }

    @Override
    @Transactional
    public boolean UpdateProDetai(Double discount, Integer idPro, Integer idProduct) {
        try {
          promotionDetailRepository.UpdateProDetai(discount,idPro,idProduct);
            return true;
        }catch(Exception ex){
            ex.printStackTrace();
             return false;
        }
    }

    @Override
    @Transactional
    public boolean deleteProDetail(Integer idProductDetail, Integer idPro) {
        try {
            promotionDetailRepository.deleteProDetail(idProductDetail,idPro);
            return true;
        }catch(Exception ex){
            ex.printStackTrace();
            return false;
        }
    }

    @Override
    @Transactional
    public boolean deleteAll(Integer idPro) {
        try {
            promotionDetailRepository.deleteAll(idPro);
            return true;
        }catch(Exception ex){
            ex.printStackTrace();
            return false;
        }
    }

    @Override
    public List<Promotional> getAll() {
        return promotinonalrepository.findAll();
    }

    @Override
    public List<Promotional> findAllByName(String name) {
        return promotinonalrepository.findAllByName(name);
    }

    @Override
    public List<Promotional> findAllByTypeDiscounts(String type) {
        return promotinonalrepository.findAllByTypeDiscounts(type);
    }

    @Override
    public List<Promotional> findAllByStatus(Integer status) {
        return promotinonalrepository.findAllByStatus(status);
    }

    @Override
    public List<Promotional> findAllByConditions(Integer status, String name, String type, Date date) {
        return promotinonalrepository.findAllByConditions(status,name,type,date);
    }


}
