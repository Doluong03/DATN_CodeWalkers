package com.example.asm_be.service;

import com.example.asm_be.entities.Users;

import java.util.List;
import java.util.UUID;

public interface UserService {

    public List<Users> getAll();

    public Users getOne(UUID id);

    public boolean save(Users users);

    public boolean update(UUID idUsers,Users users);

    public boolean delete(UUID idUsers);

}
