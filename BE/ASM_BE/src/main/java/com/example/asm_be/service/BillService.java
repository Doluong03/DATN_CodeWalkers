package com.example.asm_be.service;

import com.example.asm_be.entities.Bill;
import com.example.asm_be.request.AddBillRequest;
import com.example.asm_be.request.CreateOrder;
import com.example.asm_be.request.FeeRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface BillService {

    public List<Bill> getAll(int id);

    public Bill getOne(int id);
    public Bill save( Bill bill);
    public String update(AddBillRequest billRequest);
    public void delete( Bill bill);
    public  Integer getFee(FeeRequest feeRequest);
    public Object createOrder(CreateOrder createOrder);
}
