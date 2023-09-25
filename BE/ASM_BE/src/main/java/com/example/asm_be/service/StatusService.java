package com.example.asm_be.service;

import com.example.asm_be.entities.Status;

import java.util.List;
import java.util.UUID;

public interface StatusService {

    public List<Status> getAll();

    public Status getOne(UUID id);

    public Status save(Status status);

    public Status update(Status status);

    public void delete(Status status);

}
