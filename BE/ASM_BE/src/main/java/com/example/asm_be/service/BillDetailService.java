package com.example.asm_be.service;

import com.example.asm_be.entities.Bill;
import com.example.asm_be.entities.BillDetails;
import com.example.asm_be.request.BillDetailsRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
@Service
public interface BillDetailService {
    public List<BillDetails> getAll(int idBill);
    public BillDetails getOne(int id);
    public List<BillDetails> save( int idBill,int idCart);
    public  void update(int idBill , List<BillDetailsRequest> requestList);
    public void delete( BillDetails billDetails);
    public Double getTongGia(List<BillDetailsRequest> list);
}
