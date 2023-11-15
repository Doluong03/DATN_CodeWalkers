package com.example.asm_be.repositories;

import com.example.asm_be.entities.Address;
import com.example.asm_be.entities.Bill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.UUID;

@Repository
public interface BillRepository extends JpaRepository<Bill, Integer> {


}
