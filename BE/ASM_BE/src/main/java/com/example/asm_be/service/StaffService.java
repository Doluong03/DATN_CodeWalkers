package com.example.asm_be.service;

import com.example.asm_be.entities.Staff;
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
}
