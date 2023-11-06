package com.example.asm_be.service;

import com.example.asm_be.entities.Brands;
<<<<<<< Updated upstream

import java.util.List;
import java.util.UUID;

=======
import com.example.asm_be.entities.Users;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;


@Service
>>>>>>> Stashed changes
public interface BrandService {

    Page<Brands> getAll(Integer pageNo, Integer sizePage);

<<<<<<< Updated upstream
    public Brands getOne(UUID id);
    public Brands save( Brands brands);
    public Brands update( Brands brands);
    public void delete( Brands brands);
=======
     Brands getOne(Integer id);

     boolean save( Brands brands);

     boolean update( Brands brands);

     boolean delete( Integer idBrand);
>>>>>>> Stashed changes

}
