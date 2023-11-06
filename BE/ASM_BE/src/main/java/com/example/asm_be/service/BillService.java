package com.example.asm_be.service;

import com.example.asm_be.entities.Bill;
import com.example.asm_be.entities.Users;
import com.example.asm_be.request.*;
import org.apache.catalina.User;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
@Service
public interface BillService {


    Page<Bill> getAll(Integer pageNo,Integer sizePage);
    Bill getOne(Integer id);
    boolean save( Bill bill);
    boolean update( BillRequest1 billRequest);
    boolean delete( Integer idBill);
    public  Integer getFee(FeeRequest feeRequest);
    public Integer createOrder(CreateOrder createOrder);
}
