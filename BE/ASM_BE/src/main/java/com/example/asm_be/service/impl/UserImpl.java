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
        return null;
    }

    @Override
    public boolean save(Users users) {
        try {
            userRepository.save(users);
            return true;
        }catch (Exception ex){
              ex.getMessage();
            return false;
        }
    }

    @Override
    public boolean update(UUID idUsers, Users users) {
        try {
            users.setId(idUsers);
            userRepository.save(users);
            return true;
        }catch (Exception ex){
            ex.getMessage();
            return false;
        }
    }

    @Override
    public boolean delete(UUID idUsers) {
        try {
            userRepository.deleteById(idUsers);
            return true;
        }catch (Exception ex){
            ex.getMessage();
            return false;
        }
    }
}
