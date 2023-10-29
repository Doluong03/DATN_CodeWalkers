package com.example.asm_be.service;

import com.example.asm_be.entities.Staff;
import com.example.asm_be.entities.Users;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public interface UserService {

    Page<Users> getAll(Integer pageNo,Integer sizePage);

    Users getOne(Integer id);

    boolean save(Users users);

    boolean update(Users users);

    boolean delete(Integer idUsers);

    Optional<Users> findByUserName(String userName);

}