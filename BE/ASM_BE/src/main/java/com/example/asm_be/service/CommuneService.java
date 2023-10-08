package com.example.asm_be.service;

import com.example.asm_be.entities.Commune;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
@Service
public interface CommuneService {

    public List<Commune> getAll();

    public Commune getOne(int id);

    public Commune save(Commune commune);

    public Commune update(Commune commune);

    public void delete(Commune commune);

}
