package com.example.asm_be.service;

import com.example.asm_be.entities.FavouriteDetails;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface FavouriteDetailService {

    public List<FavouriteDetails> getAll();

    public FavouriteDetails getOne(int id);
    public FavouriteDetails save( FavouriteDetails favouriteDetails);
    public FavouriteDetails update( FavouriteDetails favouriteDetails);
    public void delete( FavouriteDetails favouriteDetails);



}
