package com.example.asm_be.service;

import com.example.asm_be.entities.Users;

import java.util.List;
import java.util.UUID;

public interface UserService {

    List<Users> getAll();

    Users getOne(UUID id);

    boolean save(Users users);

    boolean update(UUID idUsers, Users users);

    boolean delete(UUID idUsers);

}
