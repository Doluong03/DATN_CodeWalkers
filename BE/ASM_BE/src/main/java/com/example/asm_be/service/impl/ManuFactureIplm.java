package com.example.asm_be.service.impl;

import com.example.asm_be.entities.Manufacture;
import com.example.asm_be.repositories.ManuFactureRepository;
import com.example.asm_be.service.ManuFactureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

@Component
public class ManuFactureIplm implements ManuFactureService {

    @Autowired
    private ManuFactureRepository manuFactureRepository;

    @Override
    public Page<Manufacture> getAll(Integer pageNo,Integer sizePage) {
        Pageable manufacturePageable = PageRequest.of(pageNo,sizePage);
        return manuFactureRepository.findAll(manufacturePageable) ;
    }

    @Override
    public Manufacture getOne(Integer idFacture) {
        return null;
    }

    @Override
    public boolean save(Manufacture manufacture) {
        try {

            manuFactureRepository.save(manufacture);
            return true;
        } catch (Exception var4) {
            var4.getMessage();
            return false;
        }
    }

    @Override
    public boolean update(Manufacture manufacture) {
        try {
            manuFactureRepository.save(manufacture);
            return true;
        } catch (Exception var4) {
            var4.getMessage();
            return false;
        }
    }

    @Override
    public boolean delete(Integer idFacture) {
        try {
            manuFactureRepository.deleteById(idFacture);
            return true;
        } catch (Exception var4) {
            var4.getMessage();
            return false;
        }
    }
}
