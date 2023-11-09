package com.example.asm_be.service.impl;

import com.example.asm_be.entities.Users;
import com.example.asm_be.repositories.UserRepository;
import com.example.asm_be.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import java.util.List;

import java.util.Optional;
import java.util.List;

@Component
public class UserImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public Page<Users> getAll(Integer pageNo, Integer sizePage) {
        Pageable pageable = PageRequest.of(pageNo, sizePage);
        return userRepository.findAll(pageable);
    }
    @Override
    public List<Users> getAllUser() {
        return userRepository.findAll();
    }

    public Users getOne(Integer id) {
        return userRepository.findById(id).get();
    }

    @Override
    public Users findByCartId(Integer id) {
        return userRepository.findByCartId(id);
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

    public boolean update(Users users) {
        try {
            this.userRepository.save(users);
            return true;
        } catch (Exception var4) {
            var4.getMessage();
            return false;
        }
    }

    public boolean delete(Integer idUsers) {
        try {
            this.userRepository.deleteById(idUsers);
            return true;
        } catch (Exception var3) {
            var3.getMessage();
            return false;
        }

    }
    @Override
    public Optional<Users> findByNameandPhone(String name, String phone) {
        Optional<Users> users = userRepository.findByNameAndPhoneNumber(name, phone);
        return users;
    }
    @Override
    public Optional<Users> findByUserName(String userName) {
        return userRepository.findByUserName(userName);
    }

    @Override
    public List<Users> getList() {
        return userRepository.findAll();
    }

    @Override
    public Optional<Users> findByAcc(String userName, String password) {
        return userRepository.findByUserNameAndPassword(userName,password);
    }
}