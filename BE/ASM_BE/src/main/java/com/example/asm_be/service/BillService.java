package com.example.asm_be.service;

import com.example.asm_be.entities.Bill;
import com.example.asm_be.entities.Users;
import com.example.asm_be.request.AddBillRequest;
import com.example.asm_be.request.BillRequest1;
import com.example.asm_be.request.CreateOrder;
import com.example.asm_be.request.FeeRequest;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface BillService {
    public List<Bill> getByUser(int id);
    public Page<Bill> getAllPage(Integer pageNo, Integer sizePage);
    public Page<Bill> getAllPageByStatsus(Integer pageNo, Integer sizePage,int status);
    public Bill getOne(int id);
    public Bill save(Bill bill, Users user) ;
    public String update(AddBillRequest billRequest);

    Page<Bill> getAll(Integer pageNo,Integer sizePage);
    boolean saveAdmin( Bill bill);

    boolean delete( Integer idBill);
    void updateStatus( Integer idBill,int status);
    public  Integer getFee(FeeRequest feeRequest);
    public Object createOrder(CreateOrder createOrder);

}
