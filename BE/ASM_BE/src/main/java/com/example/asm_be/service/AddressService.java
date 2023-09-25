package com.example.asm_be.service;

import com.example.asm_be.entities.Address;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
@Service
public interface AddressService {

    public List<Address> getAll();

    public Address getOne(int id);
    public Address save( Address address);
    public Address update( Address address);
    public void delete( Address address);

}
