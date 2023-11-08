package com.example.asm_be.service;

import com.example.asm_be.entities.Staff;
import com.example.asm_be.entities.Users;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.Optional;
import java.util.List;

@Service
public interface UserService {

    Page<Users> getAll(Integer pageNo, Integer sizePage);

    List<Users> getList();

    List<Users> getAllUser();

    Users getOne(Integer id);

    Users findByCartId(Integer id);

    boolean save(Users users);

    boolean update(Users users);

    boolean delete(Integer idUsers);

    Optional<Users> findByNameandPhone(String name, String phone);

    Optional<Users> findByUserName(String userName);

    Optional<Users> findByAcc(String userName, String password);
}
