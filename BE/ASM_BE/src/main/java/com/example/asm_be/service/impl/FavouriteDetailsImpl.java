package com.example.asm_be.service.impl;

import com.example.asm_be.entities.FavouriteDetails;
import com.example.asm_be.entities.FavouriteList;
import com.example.asm_be.repositories.FavouriteDetailsRepository;
import com.example.asm_be.repositories.FavouriteListRepository;
import com.example.asm_be.service.FavouriteDetailService;
import com.example.asm_be.service.FavouriteListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class FavouriteDetailsImpl implements FavouriteDetailService {
    @Autowired
    private FavouriteDetailsRepository favouriteDetailsRepository;
    @Override
    public List<FavouriteDetails> getAll() {
        return favouriteDetailsRepository.findAll();
    }

    @Override
    public FavouriteDetails getOne(int id) {
        return favouriteDetailsRepository.findById(id).get();
    }

    @Override
    public FavouriteDetails save(FavouriteDetails favouriteDetail) {
        return favouriteDetailsRepository.save(favouriteDetail);
    }

    @Override
    public FavouriteDetails update(FavouriteDetails favouriteDetail) {
        return favouriteDetailsRepository.save(favouriteDetail);
    }

    @Override
    public void delete(FavouriteDetails favouriteDetail) {
        favouriteDetailsRepository.delete(favouriteDetail);
    }
}
