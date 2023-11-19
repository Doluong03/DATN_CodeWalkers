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
    public List getList() {
        return staffRepository.findAll();
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
            // Tìm nhân viên hiện tại trong cơ sở dữ liệu
            Staff existingStaff = staffRepository.findById(staff.getId()).orElse(null);

            // Kiểm tra xem nhân viên có tồn tại hay không
            if (existingStaff != null) {
                // Lưu trữ thông tin của các trường bạn không muốn cập nhật
                String username = existingStaff.getUserName();
                String password = existingStaff.getPassword(); // Nếu không lưu mật khẩu trong plaintext, hãy sử dụng phương thức mã hóa mật khẩu ở đây
                Set<Role> roles = existingStaff.getRoles();

                // Cập nhật thông tin chỉnh sửa vào nhân viên hiện tại
                existingStaff.setName(staff.getName());
                existingStaff.setDateOfBirth(staff.getDateOfBirth());
                existingStaff.setPhoneNumber(staff.getPhoneNumber());
                existingStaff.setGender(staff.getGender());
                existingStaff.setEmail(staff.getEmail());
                existingStaff.setAddress(staff.getAddress());
                existingStaff.setStatus(staff.isStatus());
                existingStaff.setImage(staff.getImage());

                // Set lại thông tin không muốn cập nhật
                existingStaff.setUserName(username);
                existingStaff.setPassword(password);
                existingStaff.setRoles(roles);

                // Lưu những thay đổi vào cơ sở dữ liệu
                staffRepository.save(existingStaff);
                return true;
            } else {
                return false; // Hoặc thực hiện xử lý khi nhân viên không tồn tại
            }
        } catch (Exception var4) {
            var4.getMessage();
            return false; // Xử lý khi có lỗi xảy ra
        }
    }

    @Override
    public boolean updateAccount(Staff staff) {
        try {
            // Tìm kiếm thông tin nhân viên hiện tại trong cơ sở dữ liệu
            Optional<Staff> existingStaffOptional = staffRepository.findById(staff.getId());

            if (existingStaffOptional.isPresent()) {
                Staff existingStaff = existingStaffOptional.get();

                // Lấy thông tin cần giữ nguyên từ nhân viên hiện tại
                String image = existingStaff.getImage();
                String address = existingStaff.getAddress();
                String email = existingStaff.getEmail();
                Date dateOfBirth = existingStaff.getDateOfBirth();
                String phoneNumber = existingStaff.getPhoneNumber();
                Boolean gender = existingStaff.getGender();

                // Cập nhật chỉ các trường bạn muốn thay đổi
                existingStaff.setName(staff.getName());
                existingStaff.setUserName(staff.getUserName());

                if(existingStaff.getPassword().equals(staff.getPassword())){
                    existingStaff.setPassword(staff.getPassword());
                }else{
                    existingStaff.setPassword(passwordEncoder.encode(staff.getPassword()));}
                // Cập nhật trạng thái, roles
                existingStaff.setStatus(staff.isStatus());
                existingStaff.setRoles(staff.getRoles());

                // Giữ nguyên các trường còn lại
                existingStaff.setImage(image);
                existingStaff.setAddress(address);
                existingStaff.setEmail(email);
                existingStaff.setPhoneNumber(phoneNumber);
                existingStaff.setDateOfBirth(dateOfBirth);
                existingStaff.setGender(gender);

                // Lưu thông tin cập nhật vào cơ sở dữ liệu
                staffRepository.save(existingStaff);

                return true;
            } else {
                return false; // Xử lý khi nhân viên không tồn tại
            }
        } catch (Exception e) {
            e.printStackTrace();
            return false; // Xử lý khi có lỗi xảy ra
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
//        if (staffRepository.existsByUserName(signUpRequest.getUserName())) {
//            return false;
//        }

        if (staffRepository.existsByEmail(signUpRequest.getEmail())) {
            return false;
        }

        Staff staff = new Staff();
        staff.setName(signUpRequest.getName());
        staff.setEmail(signUpRequest.getEmail());
        staff.setAddress(signUpRequest.getAddress());
        staff.setGender(signUpRequest.getGender());

        try {
            Date birthDayFormat = new SimpleDateFormat("dd/MM/yyyy")
                    .parse(signUpRequest.getDateOfBirth().toString());
            staff.setDateOfBirth(birthDayFormat);
        } catch (ParseException e) {
            e.printStackTrace();
        }

        // Thiết lập giá trị mặc định cho username và password
        String randomId = generateRandomId();
        staff.setUserName("CodeWalker"+randomId);
        staff.setPassword(passwordEncoder.encode("123"));

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
    public static String generateRandomId() {
        // Tạo một đối tượng Random
        Random random = new Random();

        // Sinh một số ngẫu nhiên và chuyển nó thành chuỗi
        int randomId = random.nextInt(Integer.MAX_VALUE);
        return String.valueOf(randomId);
    }

}
