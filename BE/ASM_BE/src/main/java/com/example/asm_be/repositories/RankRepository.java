package com.example.asm_be.repositories;

import com.example.asm_be.entities.Rank;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RankRepository extends JpaRepository<Rank,Integer> {

}
