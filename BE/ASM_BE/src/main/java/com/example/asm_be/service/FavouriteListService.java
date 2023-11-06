package com.example.asm_be.service;

import com.example.asm_be.entities.FavouriteList;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface FavouriteListService {

    public List<FavouriteList> getAll();

    public FavouriteList getOne(int id);
    public FavouriteList save( FavouriteList favouriteList);
    public FavouriteList update( FavouriteList favouriteList);
    public void delete( FavouriteList favouriteList);



}
