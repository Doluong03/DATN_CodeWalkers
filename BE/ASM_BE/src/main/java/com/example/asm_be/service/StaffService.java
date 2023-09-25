package com.example.asm_be.service;

import com.example.asm_be.entities.Staff;
import org.springframework.data.domain.Page;

import java.util.UUID;

public interface StaffService {
    Page<Staff> getAll(Integer pageNo);

    Staff getOne(UUID idStaff);

    boolean save(Staff staff);

    boolean update(UUID idStaff, Staff staff);

    boolean delete(UUID idStaff);
}
