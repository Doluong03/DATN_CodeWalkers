package com.example.asm_be.service;

import com.example.asm_be.entities.Staff;
<<<<<<< HEAD
import com.example.asm_be.entities.Status;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.UUID;

public interface StaffService {

    public Page<Staff> getAll(Integer pageNo);

    public Staff getOne(UUID idStaff);

    public boolean save(Staff staff);

    public boolean update(UUID idStaff,Staff staff);

    public boolean delete(UUID idStaff);
=======
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public interface StaffService {

    Page<Staff> getAll(Integer pageNo);

    Staff getOne(Integer idStaff);

    boolean save(Staff staff);

    boolean update(Staff staff);

    boolean delete(Integer idStaff);

    Optional<Staff> findByUserName(String userName);

    boolean existsByUserName(String userName);

    boolean existsByEmail(String email);
>>>>>>> c03af29a89f0e9a53594ec285dfc58f7920aafc6
}
