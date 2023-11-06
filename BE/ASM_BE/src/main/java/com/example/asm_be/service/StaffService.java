package com.example.asm_be.service;

import com.example.asm_be.entities.Staff;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface StaffService {

    Page<Staff> getAll(Integer pageNo);
    List<Staff> getList();
    Staff getOne(Integer idStaff);

    boolean save(Staff staff);

    boolean update(Staff staff);

    boolean delete(Integer idStaff);

    Optional<Staff> findByUserName(String userName);

    boolean existsByUserName(String userName);

    boolean existsByEmail(String email);
}