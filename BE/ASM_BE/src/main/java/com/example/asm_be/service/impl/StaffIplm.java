package com.example.asm_be.service.impl;

import com.example.asm_be.entities.Staff;
import com.example.asm_be.repositories.StaffRepository;
import com.example.asm_be.entities.Role;
import com.example.asm_be.entities.Size;
import com.example.asm_be.entities.Staff;
import com.example.asm_be.payload.request.SignUpRequest;
import com.example.asm_be.payload.response.MessageRespone;
import com.example.asm_be.repositories.StaffRepository;
import com.example.asm_be.service.RoleService;
import com.example.asm_be.service.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;
import java.util.List;
import java.util.Optional;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Component
public class StaffIplm implements StaffService {
    @Autowired
    private StaffRepository staffRepository;
    @Autowired
    private RoleService roleService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public Page<Staff> getAll(Integer pageNo, Integer sizePage) {
        Pageable staffPageable = PageRequest.of(pageNo, sizePage);
        return staffRepository.findAll(staffPageable);
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

    @Override
    public Optional<Staff> findByUserName(String userName) {
        return staffRepository.findByUserName(userName);
    }

    @Override
    public boolean existsByUserName(String userName) {
        return staffRepository.existsByUserName(userName);
    }

    @Override
    public boolean existsByEmail(String email) {
        return staffRepository.existsByEmail(email);
    }

    @Override
    public boolean saveStaff(SignUpRequest signUpRequest) {
        if (staffRepository.existsByUserName(signUpRequest.getUserName())) {
            return false;
        }

        if (staffRepository.existsByEmail(signUpRequest.getEmail())) {
            return false;
        }
        Staff staff = new Staff();
        staff.setName(signUpRequest.getName());
        staff.setEmail(signUpRequest.getEmail());
        staff.setAddress(signUpRequest.getAddress());
        staff.setGender(signUpRequest.getGender());

        try {
            Date birthDayFormat = new SimpleDateFormat("EEE MMM dd HH:mm:ss zzz yyyy", Locale.US)
                    .parse(signUpRequest.getDateOfBirth().toString());
            staff.setDateOfBirth(birthDayFormat);
        } catch (ParseException e) {
            e.printStackTrace();
        }

        staff.setUserName(signUpRequest.getUserName());
        staff.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
        staff.setPhoneNumber(signUpRequest.getPhoneNumber());
        staff.setStatus(signUpRequest.isStatus());
        staff.setImage(signUpRequest.getImage());

        Set<String> strRoles = signUpRequest.getListRoles();
        Set<Role> listRole = new HashSet<>();

        if (strRoles == null) {
            // Default role is employee
            Role role = roleService.findByNameRole("ROLE_EMPLOYEE")
                    .orElseThrow(() -> new RuntimeException("Error: Role 'EMPLOYEE' not found"));
            listRole.add(role);
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "admin":
                        Role adminRole = roleService.findByNameRole("ROLE_ADMIN")
                                .orElseThrow(() -> new RuntimeException("Error: Role 'ADMIN' not found"));
                        listRole.add(adminRole);
                        break;
                    case "employee":
                        Role employeeRole = roleService.findByNameRole("ROLE_EMPLOYEE")
                                .orElseThrow(() -> new RuntimeException("Error: Role 'EMPLOYEE' not found"));
                        listRole.add(employeeRole);
                        break;
                }
            });
        }

        staff.setRoles(listRole);
        staffRepository.save(staff);
        return true;
    }
}
