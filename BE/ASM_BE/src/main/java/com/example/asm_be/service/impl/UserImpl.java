package com.example.asm_be.service.impl;

import com.example.asm_be.entities.Address;
import com.example.asm_be.entities.Users;
import com.example.asm_be.repositories.AddressRepository;
import com.example.asm_be.repositories.UserRepository;
import com.example.asm_be.service.AddressService;
import com.example.asm_be.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.UUID;

@Component
public class UserImpl implements UserService {
    @Autowired
    private UserRepository userRepository;
    @Override
    public List<Users> getAll() {
        return userRepository.findAll();
    }

    @Override
    public Users getOne(UUID id) {
        return userRepository.findById(id).get();
    }

    @Override
    public Users save(Users user) {
        return userRepository.save(user);
    }

    @Override
    public Users update(Users user) {
        return userRepository.save(user);
    }

    @Override
    public void delete(Users user) {
        userRepository.delete(user);
    }
}
