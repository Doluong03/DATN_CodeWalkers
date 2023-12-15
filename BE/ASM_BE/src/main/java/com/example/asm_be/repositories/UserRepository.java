package com.example.asm_be.repositories;

import com.example.asm_be.entities.Users;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.apache.catalina.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<Users, Integer> {
    Optional<Users> findByUserName(String userName);

    @Query("SELECT c FROM Users c WHERE (c.email is not null ) and (:userNameParam = false AND c.userName IS NULL OR :userNameParam = true AND c.userName IS NOT NULL)")
    Page<Users> findByAcc(@Param("userNameParam") boolean userNameParam, Pageable pageable);


    Optional<Users> findByUserNameAndPassword(String userName, String password);

    Optional<Users> findByNameAndPhoneNumber(String userName, String phone);

    @Query("select c from Users c where c.cart.id =?1")
    Users findByCartId(int id);


    @Query("""
               SELECT kh
               FROM Users kh
               WHERE kh.id NOT IN (SELECT hd.users.id FROM HoaDon hd)
               
            """)
    List<Users> getUserNew();

    @Query("""
               SELECT kh
               FROM Users kh
               WHERE kh.id IN (SELECT hd.users.id FROM HoaDon hd)
               
            """)
    List<Users> getUserOld();

    @Query("select kh from Users kh where kh.rank.id =2")
    List<Users> getUserSliver();

    @Query("select kh from Users kh where kh.rank.id =3")
    List<Users> getUserGold();

    @Query("select kh from Users kh where kh.rank.id =4")
    List<Users> getUserDiamond();

    @Procedure(name = "CapNhatRankTheoIdKhachHang")
    void capNhatRankTheoIdKhachHang(@Param("idKhachHang") int idKhachHang);
}
