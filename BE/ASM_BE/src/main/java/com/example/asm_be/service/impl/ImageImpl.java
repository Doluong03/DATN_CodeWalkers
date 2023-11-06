package com.example.asm_be.service.impl;

import com.example.asm_be.entities.Address;
import com.example.asm_be.entities.Image;
import com.example.asm_be.repositories.AddressRepository;
import com.example.asm_be.repositories.ImageRepository;
import com.example.asm_be.service.AddressService;
import com.example.asm_be.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.UUID;

@Component
public class ImageImpl implements ImageService {
    @Autowired
    private ImageRepository imageRepository;
    @Override
    public List<Image> getAll() {
        return imageRepository.findAll();
    }

    @Override
    public Image getOne(int id) {
        return imageRepository.findById(id).get();
    }

    @Override
    public Image save(Image image) {
        return imageRepository.save(image);
    }

    @Override
    public Image update(Image image) {
        return imageRepository.save(image);
    }

    @Override
    public void delete(Image image) {
        imageRepository.delete(image);
    }
}
