package com.example.asm_be.security.staff;

import com.example.asm_be.entities.Staff;
import com.example.asm_be.repositories.StaffRepository;
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

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Staff> Staff = staffRepository.findByUserName(username);

        if(Staff == null) {
            throw new UsernameNotFoundException("LoginRequest dont exists");
        }

        return CustomUserDetails.mapAccountToUserDetails(Staff.get());
    }
}
