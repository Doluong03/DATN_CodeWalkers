package com.example.asm_be.service;

import com.example.asm_be.entities.Image;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
@Service
public interface ImageService {

    List<Image> getAll();

    Image getOne(Integer idImage);

    boolean save(Image image);

    boolean update(Image image);

    boolean delete(Integer idImage);

}
