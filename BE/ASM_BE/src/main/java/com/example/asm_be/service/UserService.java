package com.example.asm_be.service;

import com.example.asm_be.entities.Staff;
import com.example.asm_be.entities.Users;
import com.example.asm_be.request.UserRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.Optional;
import java.util.List;

@Service
public interface UserService {

    public Page<Users> getAll(Boolean checkAcc ,Integer pageNo, Integer sizePage);

    List<Users> getList();

    List<Users> getAllUser();

    Users getOne(Integer id);

    Users findByCartId(Integer id);

    Users save(Users users);

    boolean update(UserRequest users);

    boolean delete(Integer idUsers);

    Optional<Users> findByNameandPhone(String name, String phone);

    Optional<Users> findByUserName(String userName);

    Optional<Users> findByAcc(String userName, String password);

    List<Users> getUserOld();

    List<Users> getUserNew();

    public boolean updateInActive(int  id);
    void switchStatus(Integer id);


    void updateRankUser(Integer idUser);

    boolean updatePointRankUser(Integer point,String userName);

    List<Users> getUserSliver();

    List<Users> getUserGold();

    List<Users> getUserDiamond();
}
