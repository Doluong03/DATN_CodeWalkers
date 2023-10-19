package com.example.asm_be.repositories;

import com.example.asm_be.entities.Staff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StaffRepository extends JpaRepository<Staff,Integer> {
       Optional<Staff> findByUserName(String userName);
       boolean existsByUserName(String userName);
       boolean existsByEmail(String email);

}
