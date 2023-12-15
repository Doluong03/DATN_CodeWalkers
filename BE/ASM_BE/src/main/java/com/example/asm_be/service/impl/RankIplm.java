package com.example.asm_be.service.impl;

import com.example.asm_be.entities.Rank;
import com.example.asm_be.repositories.RankRepository;
import com.example.asm_be.service.RankService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

@Component
public class RankIplm implements RankService {

    @Autowired
    private RankRepository rankRepository;

    @Override
    public Page<Rank> getAll(Integer pageNo, Integer sizePage) {
        Pageable pageable = PageRequest.of(pageNo,sizePage);
        return rankRepository.findAll(pageable);
    }

    @Override
    public boolean saveRank(Rank rank) {
       try{
           rankRepository.save(rank);
           return true;
       }catch (Exception e){
            e.printStackTrace();
            return false;
       }
    }

    @Override
    public boolean deleteRank(Integer id) {
        try{
            rankRepository.deleteById(id);
            return true;
        }catch (Exception e){
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public boolean updateRank(Rank rank) {
        try{
            rankRepository.save(rank);
            return true;
        }catch (Exception e){
            e.printStackTrace();
            return false;
        }
    }
}
