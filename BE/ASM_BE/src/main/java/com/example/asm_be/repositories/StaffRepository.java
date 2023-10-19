package com.example.asm_be.repositories;

import com.example.asm_be.entities.Staff;
<<<<<<< HEAD
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface StaffRepository extends JpaRepository<Staff, UUID> {

=======
import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StaffRepository extends JpaRepository<Staff,Integer> {
       Optional<Staff> findByUserName(String userName);
       boolean existsByUserName(String userName);
       boolean existsByEmail(String email);
>>>>>>> c03af29a89f0e9a53594ec285dfc58f7920aafc6
}
