package com.example.asm_be.repositories;

import com.example.asm_be.entities.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;
@Repository
public interface AddressRepository extends JpaRepository<Address, Integer> {
    List<Address> findByUsersId(int idUser);
}
