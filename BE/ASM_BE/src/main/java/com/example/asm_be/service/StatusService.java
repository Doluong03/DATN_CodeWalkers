package com.example.asm_be.service;

import com.example.asm_be.entities.Status;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
@Service
public interface StatusService {

    public List<Status> getAll();

    public Status getOne(int id);

    public Status save(Status status);

    public Status update(Status status);

    public void delete(Status status);

}
