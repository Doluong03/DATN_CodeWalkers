package com.example.asm_be.repositories;

import com.example.asm_be.entities.Bill;
import com.example.asm_be.entities.BillDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;
@Repository
public interface BillDetailsRepository extends JpaRepository<BillDetails, Integer> {
    List<BillDetails> findByBillId(int idBill);
    int deleteAllByBillId(int idBill);
}
