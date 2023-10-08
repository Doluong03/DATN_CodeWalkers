package com.example.asm_be.service;

import com.example.asm_be.entities.Staff;
import org.springframework.data.domain.Page;

public interface StaffService {

    Page<Staff> getAll(Integer pageNo);

    Staff getOne(Integer idStaff);

    boolean save(Staff staff);

    boolean update(Staff staff);

    boolean delete(Integer idStaff);
}
