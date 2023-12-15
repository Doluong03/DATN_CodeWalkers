package com.example.asm_be.service;

import com.example.asm_be.entities.Rank;
import com.example.asm_be.entities.Users;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
public interface RankService {
    Page<Rank> getAll(Integer pageNo, Integer sizePage);

    boolean saveRank(Rank rank);

    boolean deleteRank(Integer id);

    boolean updateRank(Rank rank);
}
