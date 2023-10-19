package com.example.asm_be.service;

import com.example.asm_be.entities.Users;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
@Service
public interface UserService {

    Page<Users> getAll(Integer pageNo,Integer sizePage);

    Users getOne(Integer id);

<<<<<<< HEAD
    public boolean save(Users users);

    public boolean update(UUID idUsers,Users users);

    public boolean delete(UUID idUsers);
=======
    boolean save(Users users);

    boolean update(Users users);

    boolean delete(Integer idUsers);
>>>>>>> c03af29a89f0e9a53594ec285dfc58f7920aafc6

}
