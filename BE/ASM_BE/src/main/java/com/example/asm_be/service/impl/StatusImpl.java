package com.example.asm_be.service.impl;

import com.example.asm_be.entities.Address;
import com.example.asm_be.entities.Status;
import com.example.asm_be.repositories.AddressRepository;
import com.example.asm_be.repositories.StatusRepository;
import com.example.asm_be.service.AddressService;
import com.example.asm_be.service.StatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.UUID;

@Component
public class StatusImpl implements StatusService {
    @Autowired
    private StatusRepository statusRepository;
    @Override
    public List<Status> getAll() {
        return statusRepository.findAll();
    }

    @Override
    public Status getOne(int id) {
        return statusRepository.findById(id).get();
    }

    @Override
    public Status save(Status status) {
        return statusRepository.save(status);
    }

    @Override
    public Status update(Status status) {
        return statusRepository.save(status);
    }

    @Override
    public void delete(Status status) {
        statusRepository.delete(status);
    }
}
