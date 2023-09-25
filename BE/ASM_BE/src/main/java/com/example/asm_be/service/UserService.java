package com.example.asm_be.service;

import com.example.asm_be.entities.Users;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
@Service
public interface UserService {

    public List<Users> getAll();

    public Users getOne(int id);

    public Users save(Users users);

    public Users update(Users users);

    public void delete(Users users);

}
