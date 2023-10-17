package com.example.asm_be.service;

import com.example.asm_be.entities.Role;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public interface RoleService {

    Optional<Role> findByNameRole(String roleName);

}
