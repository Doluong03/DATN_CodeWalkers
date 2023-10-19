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

@Component
public class UserImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

<<<<<<< HEAD
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
=======

    @Override
    public Page<Users> getAll(Integer pageNo,Integer sizePage) {
        Pageable pageable = PageRequest.of(pageNo,sizePage);
        return userRepository.findAll(pageable);
    }

    public Users getOne(Integer id) {
        return null;
    }

    public boolean save(Users users) {
        try {
            this.userRepository.save(users);
            return true;
        } catch (Exception var3) {
            var3.getMessage();
>>>>>>> c03af29a89f0e9a53594ec285dfc58f7920aafc6
            return false;
        }
    }

<<<<<<< HEAD
    @Override
    public boolean delete(UUID idUsers) {
        try {
            userRepository.deleteById(idUsers);
            return true;
        }catch (Exception ex){
            ex.getMessage();
=======
    public boolean update( Users users) {
        try {
            this.userRepository.save(users);
            return true;
        } catch (Exception var4) {
            var4.getMessage();
>>>>>>> c03af29a89f0e9a53594ec285dfc58f7920aafc6
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
}