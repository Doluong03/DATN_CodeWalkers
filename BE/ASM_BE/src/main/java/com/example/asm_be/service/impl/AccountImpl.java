package com.example.asm_be.service.impl;

import com.example.asm_be.entities.Role;
import com.example.asm_be.entities.Staff;
import com.example.asm_be.entities.Status;
import com.example.asm_be.service.RoleService;
import com.example.asm_be.service.StaffService;
import com.example.asm_be.service.StatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;

@Component
public class AccountImpl implements CommandLineRunner {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private StaffService staffService;

    @Autowired
    private RoleService roleService;
    @Autowired
    private StatusService statusService;

    @Override
    public void run(String... args) {
        // Kiểm tra xem có tài khoản mặc định đã tồn tại chưa
        if (staffService.findByUserName("adminDefault").isEmpty()) {
            System.out.println("aaaaa ");
            // Tạo tài khoản mẫu
            Staff staff = new Staff();
            staff.setName("Default User");
            staff.setEmail("default@example.com");
            staff.setUserName("adminDefault");
            staff.setPassword(passwordEncoder.encode("1"));
            staff.setPhoneNumber("1234567890");
            staff.setStatus(true);  // Hoặc false tùy vào trạng thái mặc định
            staff.setImage("default.jpg");  // Tên file ảnh mặc định

            // Tạo Role ADMIN
            Role roleAdmin = new Role();
            roleAdmin.setNameRole("ROLE_ADMIN");
            roleService.save(roleAdmin);

            // Tạo Role EMPLOYEE
            Role roleEmployee = new Role();
            roleEmployee.setNameRole("ROLE_EMPLOYEE");
            roleService.save(roleEmployee);
            Status status = new Status();
            status.setName("Đang hoạt động");
            statusService.save(status);
            // Lấy quyền mặc định (ví dụ: ROLE_ADMIN)
            Role defaultRole = roleService.findByNameRole("ROLE_ADMIN")
                    .orElseThrow(() -> new RuntimeException("Error: Role 'ADMIN' not found"));

            Set<Role> roles = new HashSet<>();
            roles.add(defaultRole);
            staff.setRoles(roles);

            // Lưu tài khoản vào cơ sở dữ liệu
            staffService.save(staff);
        }
    }
}
