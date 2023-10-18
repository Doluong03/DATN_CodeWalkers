package com.example.asm_be.service;

import com.example.asm_be.entities.Bill;
import com.example.asm_be.entities.Users;
import com.example.asm_be.request.AddBillRequest;
import com.example.asm_be.request.CreateOrder;
import com.example.asm_be.request.FeeRequest;
import org.apache.catalina.User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
@Service
public interface BillService {

    public List<Bill> getAll();

    public Bill getOne(int id);
    public Bill save( Bill bill);
    public Bill update( Bill bill);
    public void delete( Bill bill);
    public  Integer getFee(FeeRequest feeRequest);
    public Integer createOrder(CreateOrder createOrder);
}
