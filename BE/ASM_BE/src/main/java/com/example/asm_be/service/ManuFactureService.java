package com.example.asm_be.service;

import com.example.asm_be.entities.Manufacture;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
public interface ManuFactureService {

    Page<Manufacture> getAll(Integer pageNo,Integer sizePage);

    Manufacture getOne(Integer idFacture);

    boolean save(Manufacture manufacture);

    boolean update(Manufacture manufacture);

    boolean delete(Integer idFacture);
}
