package com.example.asm_be.service;

import com.example.asm_be.entities.District;

import java.util.List;
import java.util.UUID;

public interface DistrictService {

    public List<District> getAll();

    public District getOne(UUID id);

    public District save(District district);

    public District update(District district);

    public void delete(District district);

}
