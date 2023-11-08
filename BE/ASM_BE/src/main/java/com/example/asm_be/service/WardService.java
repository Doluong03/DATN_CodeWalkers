package com.example.asm_be.service;

import com.example.asm_be.entities.Ward;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface WardService {

    public List<Ward> getAll();

    public Ward getOne(int id);

    public Ward save(Ward ward);

    public Ward update(Ward ward);

    public void delete(Ward ward);

}
