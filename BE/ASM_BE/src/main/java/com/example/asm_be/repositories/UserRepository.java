package com.example.asm_be.repositories;

import com.example.asm_be.entities.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<Users, Integer> {
      Optional<Users> findByUserName(String userName);
      Optional<Users> findByUserNameAndPassword(String userName,String password);
      Optional<Users> findByNameAndPhoneNumber(String userName, String phone);
      @Query("select c from Users c where c.cart.id =?1")
      Users findByCartId(int id);
}
