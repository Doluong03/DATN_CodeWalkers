package com.example.asm_be.service;

import com.example.asm_be.entities.Size;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
@Service
public interface SizeService {

    Page<Size> getAllPage(Integer pageNo, Integer sizePage);
    List<Size> getAll();

    Size getOne(Integer idSize);

    boolean save(Size size);

    boolean update(Size size);

    boolean delete(Integer idSize);

    public Size findByName(String name);
    Optional<Size> findbyId(Integer idSize);
}
