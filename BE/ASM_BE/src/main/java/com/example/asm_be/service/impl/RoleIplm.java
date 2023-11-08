package com.example.asm_be.service.impl;

import com.example.asm_be.entities.Role;
import com.example.asm_be.entities.Product;
import com.example.asm_be.entities.Role;
import com.example.asm_be.repositories.ProductRepository;
import com.example.asm_be.repositories.RoleRepository;
import com.example.asm_be.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class RoleIplm implements RoleService {

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public List<Role> getAll() {
        return roleRepository.findAll();
    }
    @Override
    public Optional<Role> findByNameRole(String roleName) {
        return roleRepository.findByNameRole(roleName);
    }
}
