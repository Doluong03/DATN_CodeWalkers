package com.example.asm_be.service;

import com.example.asm_be.entities.Address;

import java.util.List;
import java.util.UUID;

public interface AddressService {

    public List<Address> getAll();

    public Address getOne(UUID id);
    public Address save( Address address);
    public Address update( Address address);
    public void delete( Address address);

}
