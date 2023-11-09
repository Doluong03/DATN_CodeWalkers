package com.example.asm_be.service.impl;

import com.example.asm_be.entities.Role;
import com.example.asm_be.entities.Staff;
import com.example.asm_be.entities.Users;
import com.example.asm_be.jwt.JwtTokenProvider;
import com.example.asm_be.payload.request.LoginRequest;
import com.example.asm_be.payload.request.SignUpRequest;
import com.example.asm_be.payload.request.userRequest;
import com.example.asm_be.payload.response.JwtRespone;
import com.example.asm_be.payload.response.MessageRespone;
import com.example.asm_be.security.staff.CustomUserDetails;
import com.example.asm_be.security.user.UserDetailsCustom;
import com.example.asm_be.service.AuthService;
import com.example.asm_be.service.RoleService;
import com.example.asm_be.service.StaffService;
import com.example.asm_be.service.UserService;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

@Data
@AllArgsConstructor
@Component
public class AuthServiceIplm implements AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    @Autowired
    private StaffService staffService;
    @Autowired
    private RoleService roleService;
    @Autowired
    private UserService userService;

    @Override
    public ResponseEntity<JwtRespone> Login(LoginRequest account) {
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(
                        account.getUserName(), account.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        Object principal = authentication.getPrincipal();

        if (principal instanceof CustomUserDetails) {
            CustomUserDetails customUserDetails = (CustomUserDetails) principal;
            // Process CustomUserDetails and generate JWT
            String jwt = jwtTokenProvider.generateToken(customUserDetails);
            // lấy các quyền của nhân viên
            List<String> ListRoles = customUserDetails.getAuthorities().stream()
                    .map(grantedAuthority -> grantedAuthority.getAuthority()).collect(Collectors.toList());

            return ResponseEntity.ok(
                    new JwtRespone(jwt, ListRoles, customUserDetails.getUsername(), customUserDetails.getPassword()));
        } else {
            // Handle the case when the principal is not of type CustomUserDetails
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Override
    public ResponseEntity<?> Register(SignUpRequest signUpRequest) {
        if (staffService.existsByUserName(signUpRequest.getUserName())) {
            return ResponseEntity.badRequest()
                    .body(new MessageRespone("Error: Username " + signUpRequest.getUserName() + " is already taken."));
        }

        if (staffService.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity.badRequest()
                    .body(new MessageRespone("Error: Email " + signUpRequest.getEmail() + " is already registered."));
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
        staffService.save(staff);

        return ResponseEntity.ok(new MessageRespone("SignUp Successful"));
    }

    @Override
    public ResponseEntity<?> RegisterUser(userRequest userRequest) {

         Users users = new Users();
         users.setUserName(userRequest.getUserName());
         users.setPassword(passwordEncoder.encode(userRequest.getPassword()));
         users.setRole("ROLE_USER");

        userService.save(users);
        return ResponseEntity.ok(new MessageRespone("SignUp User Successful"));
    }

    @Override
    public ResponseEntity<JwtRespone> LoginUser(userRequest account) {
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(
                        account.getUserName(), account.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        Object principal = authentication.getPrincipal();

        if (principal instanceof UserDetailsCustom) {
            UserDetailsCustom userDetailsCustom = (UserDetailsCustom) principal;
            // Process UserDetailsCustom and generate JWT
            String jwt = jwtTokenProvider.generateTokenUser(userDetailsCustom);
            String role = userDetailsCustom.getAuthorities().iterator().next().getAuthority();

            return ResponseEntity.ok(
                    new JwtRespone(jwt, userDetailsCustom.getUsername(), userDetailsCustom.getPassword(), role));
        } else {
            // Handle the case when the principal is not of type UserDetailsCustom
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }




}
