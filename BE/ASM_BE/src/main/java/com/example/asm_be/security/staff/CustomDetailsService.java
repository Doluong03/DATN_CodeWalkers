package com.example.asm_be.security;

import com.example.asm_be.entities.Staff;
import com.example.asm_be.entities.Users;
import com.example.asm_be.repositories.StaffRepository;
import com.example.asm_be.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Optional;
@Component
public class CustomDetailsService implements UserDetailsService {
    @Autowired
    private StaffRepository staffRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Staff> Staff = staffRepository.findByUserName(username);
        Optional<Users> users = userRepository.findByUserNameOrEmail(username);

        if(Staff == null) {
            throw new UsernameNotFoundException("LoginRequest dont exists");
        }

        return CustomUserDetails.mapAccountToUserDetails(Staff.get());
    }
}
