package com.example.asm_be.service;

import com.example.asm_be.entities.Bill;

import java.util.List;
import java.util.UUID;

public interface BillService {

    public List<Bill> getAll();

    public Bill getOne(UUID id);
    public Bill save( Bill bill);
    public Bill update( Bill bill);
    public void delete( Bill bill);

}
