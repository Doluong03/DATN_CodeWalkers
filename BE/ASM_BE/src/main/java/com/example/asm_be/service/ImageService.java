package com.example.asm_be.service;

import com.example.asm_be.entities.Image;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
@Service
public interface ImageService {

    public List<Image> getAll();

    public Image getOne(int id);

    public Image save(Image image);

    public Image update(Image image);

    public void delete(Image image);

}
