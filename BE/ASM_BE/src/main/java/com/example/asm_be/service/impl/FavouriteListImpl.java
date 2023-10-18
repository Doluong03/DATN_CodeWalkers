package com.example.asm_be.service.impl;
import com.example.asm_be.entities.Cart;
import com.example.asm_be.entities.FavouriteList;
import com.example.asm_be.repositories.CartRepository;
import com.example.asm_be.repositories.FavouriteListRepository;
import com.example.asm_be.service.CartService;
import com.example.asm_be.service.FavouriteListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class FavouriteListImpl implements FavouriteListService {
    @Autowired
    private FavouriteListRepository favouriteListRepository;
    @Override
    public List<FavouriteList> getAll() {
        return favouriteListRepository.findAll();
    }

    @Override
    public FavouriteList getOne(int id) {
        return favouriteListRepository.findById(id).get();
    }

    @Override
    public FavouriteList save(FavouriteList favouriteList) {
        return favouriteListRepository.save(favouriteList);
    }

    @Override
    public FavouriteList update(FavouriteList favouriteList) {
        return favouriteListRepository.save(favouriteList);
    }

    @Override
    public void delete(FavouriteList favouriteList) {
        favouriteListRepository.delete(favouriteList);
    }
}
