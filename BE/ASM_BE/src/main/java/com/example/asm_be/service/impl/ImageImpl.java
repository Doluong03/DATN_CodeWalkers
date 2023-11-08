package com.example.asm_be.service.impl;

import com.example.asm_be.entities.Address;
import com.example.asm_be.entities.Image;
import com.example.asm_be.repositories.AddressRepository;
import com.example.asm_be.repositories.ImageRepository;
import com.example.asm_be.service.AddressService;
import com.example.asm_be.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.UUID;

@Component
public class ImageImpl implements ImageService {
    @Autowired
    private ImageRepository imageRepository;

    @Override
    public Page<Image> getAll(Integer pageNo, Integer sizePage) {
        Pageable imagePageable = PageRequest.of(pageNo,sizePage);
        return imageRepository.findAll(imagePageable) ;
    }

    @Override
    public Image getOne(Integer idFacture) {
        return null;
    }

    @Override
    public boolean save(Image image) {
        try {

            imageRepository.save(image);
            return true;
        } catch (Exception var4) {
            var4.getMessage();
            return false;
        }
    }

    @Override
    public boolean update(Image image) {
        try {
            imageRepository.save(image);
            return true;
        } catch (Exception var4) {
            var4.getMessage();
            return false;
        }
    }

    @Override
    public boolean delete(Integer idImage) {
        try {
            imageRepository.deleteById(idImage);
            return true;
        } catch (Exception var4) {
            var4.getMessage();
            return false;
        }
    }
}
