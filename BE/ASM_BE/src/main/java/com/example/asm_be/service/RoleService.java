package com.example.asm_be.service;

import com.example.asm_be.entities.Role;
import org.springframework.stereotype.Service;

import com.example.asm_be.entities.Product;
import com.example.asm_be.entities.Role;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface RoleService {
    List<Role> getAll();

    Optional<Role> findByNameRole(String roleName);

}
