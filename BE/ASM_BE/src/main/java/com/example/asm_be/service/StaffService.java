package com.example.asm_be.service;

import com.example.asm_be.entities.Staff;
import com.example.asm_be.payload.request.SignUpRequest;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface StaffService {

    Page<Staff> getAll(Integer pageNo, Integer sizePage);

    Staff getOne(Integer idStaff);

    boolean save(Staff staff);

    boolean update(Staff staff);

    boolean delete(Integer idStaff);

    Optional<Staff> findByUserName(String userName);

    boolean existsByUserName(String userName);

    boolean existsByEmail(String email);

    boolean saveStaff(SignUpRequest signUpRequest);
}
