package com.example.asm_be.service;

import com.example.asm_be.entities.Image;

import java.util.List;
import java.util.UUID;

public interface ImageService {

    public List<Image> getAll();

    public Image getOne(UUID id);

    public Image save(Image image);

    public Image update(Image image);

    public void delete(Image image);

}
