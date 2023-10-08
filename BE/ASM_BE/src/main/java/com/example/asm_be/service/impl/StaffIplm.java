package com.example.asm_be.service.impl;

import com.example.asm_be.entities.Staff;
import com.example.asm_be.repositories.StaffRepository;
import com.example.asm_be.service.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

public class StaffIplm implements StaffService {
    @Autowired
    private StaffRepository staffRepository;

    @Override
    public Page<Staff> getAll(Integer pageNo) {
        Pageable pageable = PageRequest.of(pageNo, 5);
        return staffRepository.findAll(pageable);
    }

    @Override
    public Staff getOne(Integer idStaff) {
        return staffRepository.getOne(idStaff);
    }

    @Override
    public boolean save(Staff staff) {
        try {
            staffRepository.save(staff);
            return true;
        } catch (Exception var3) {
            var3.getMessage();
            return false;
        }
    }

    @Override
    public boolean update(Staff staff) {
        try {

            staffRepository.save(staff);
            return true;
        } catch (Exception var4) {
            var4.getMessage();
            return false;
        }
    }

    @Override
    public boolean delete(Integer idStaff) {
        try {
            staffRepository.deleteById(idStaff);
            return true;
        } catch (Exception var3) {
            var3.getMessage();
            return false;
        }
    }
}
