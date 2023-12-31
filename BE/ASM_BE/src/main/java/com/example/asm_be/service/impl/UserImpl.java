package com.example.asm_be.service.impl;

import com.example.asm_be.entities.Rank;
import com.example.asm_be.entities.Staff;
import com.example.asm_be.entities.Users;
import com.example.asm_be.repositories.RankRepository;
import com.example.asm_be.repositories.UserRepository;
import com.example.asm_be.request.UserRequest;
import com.example.asm_be.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

import java.util.List;

import java.util.Optional;
import java.util.List;

@Component
public class UserImpl implements UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RankRepository rankRepository;

    @Override
    public Page<Users> getAll(Boolean checkAcc ,Integer pageNo, Integer sizePage) {
        Pageable pageable = PageRequest.of(pageNo, sizePage, Sort.by(Sort.Order.desc("id")));
        return userRepository.findByAcc(checkAcc ,pageable);
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

    public Users save(Users users) {
        try {
            Rank rank = rankRepository.findById(1).get();
            users.setRank(rank);
            this.userRepository.save(users);
            return users;
        } catch (Exception var3) {
            var3.getMessage();
            return null;
        }
    }

    public boolean update(UserRequest userRequest) {
        try {
            Users users = userRepository.findById(userRequest.getId()).get();
            userRequest.map(users);
            this.userRepository.save(users);
            return true;
        } catch (Exception var4) {
            var4.getMessage();
            return false;
        }
    }
    public boolean updateInActive(int  id) {
        try {
            Users users = userRepository.findById(id).get();
            users.setStatus(false);
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

    @Override
    public List<Users> getUserOld() {
        return userRepository.getUserOld();
    }

    @Override
    public List<Users> getUserNew() {
        return userRepository.getUserNew();
    }

    @Override
    public void switchStatus(Integer id) {
        Optional<Users> optinalBrand = userRepository.findById(id);
        System.out.println(optinalBrand.get().isStatus()+"aaaa");
        if (optinalBrand.isPresent()) {
            Users user = optinalBrand.get();
            user.setStatus(!user.isStatus());
            userRepository.save(user);
        }
    }
    public void updateRankUser(Integer idUser) {
        userRepository.capNhatRankTheoIdKhachHang(idUser);
    }

    @Override
    public boolean updatePointRankUser(Integer point,String userName) {
        try {
         Users users  = userRepository.findByUserName(userName).get();
         users.setPoints(point);
         userRepository.save(users);
          updateRankUser(users.getId());
            return true;
        } catch (Exception var3) {
            var3.getMessage();
            return false;
        }
    }

    @Override
    public List<Users> getUserSliver() {
        return userRepository.getUserSliver();
    }

    @Override
    public List<Users> getUserGold() {
        return userRepository.getUserGold();
    }

    @Override
    public List<Users> getUserDiamond() {
        return userRepository.getUserDiamond();
    }
}