package com.example.asm_be.service;

import com.example.asm_be.entities.Bill;
import com.example.asm_be.entities.BillDetails;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
@Service
public interface BillDetailService {

    public List<BillDetails> getAll();

    public BillDetails getOne(int id);
    public BillDetails save( BillDetails billDetails);
    public BillDetails update( BillDetails billDetails);
    public void delete( BillDetails billDetails);



}
