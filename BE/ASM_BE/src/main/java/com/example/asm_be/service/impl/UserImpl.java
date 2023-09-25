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
    public List<Users> getAll() {
        return this.userRepository.findAll();
    }

    public Users getOne(UUID id) {
        return null;
    }

    public boolean save(Users users) {
        try {
            this.userRepository.save(users);
            return true;
        } catch (Exception var3) {
            var3.getMessage();
            return false;
        }
    }

    public boolean update(UUID idUsers, Users users) {
        try {
            users.setId(idUsers);
            this.userRepository.save(users);
            return true;
        } catch (Exception var4) {
            var4.getMessage();
            return false;
        }
    }

    public boolean delete(UUID idUsers) {
        try {
            this.userRepository.deleteById(idUsers);
            return true;
        } catch (Exception var3) {
            var3.getMessage();
            return false;
        }

}
