package com.example.asm_be.security.user;

import com.example.asm_be.entities.Users;
import com.example.asm_be.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class CustomUsersDetailsService implements UserDetailsService {


    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Users> users = userRepository.findByUserName(username);

        if(users == null) {
            throw new UsernameNotFoundException("LoginRequest dont exists");
        }

          return UserDetailsCustom.mapUserToUserDetails(users.get());
    }
}
