package com.example.asm_be.repositories;

import com.example.asm_be.entities.Brands;
import com.example.asm_be.entities.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;
@Repository
public interface UserRepository extends JpaRepository<Users, UUID> {
}
