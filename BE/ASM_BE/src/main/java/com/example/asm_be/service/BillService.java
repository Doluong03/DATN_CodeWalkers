package com.example.asm_be.service;

import com.example.asm_be.entities.Bill;
import com.example.asm_be.entities.Users;
import com.example.asm_be.request.CreateOrder;
import com.example.asm_be.request.FeeRequest;
import org.apache.catalina.User;
import com.example.asm_be.request.*;
import org.apache.catalina.User;
import org.springframework.data.domain.Page;
import com.example.asm_be.request.AddBillRequest;
import com.example.asm_be.request.CreateOrder;
import com.example.asm_be.request.FeeRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface BillService {
    public List<Bill> getAll();

    public List<Bill> getAll(int id);

    public Bill getOne(int id);
    public Bill save( Bill bill);
    public String update(AddBillRequest billRequest);
    public void delete( Bill bill);

    Page<Bill> getAll(Integer pageNo,Integer sizePage);
    Bill getOne(Integer id);
    boolean saveAdmin( Bill bill);
    boolean update( BillRequest1 billRequest);
    boolean delete( Integer idBill);
    public  Integer getFee(FeeRequest feeRequest);
    public Object createOrder(CreateOrder createOrder);
}
