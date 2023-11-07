package com.example.asm_be.service;

import com.example.asm_be.entities.Address;
import com.example.asm_be.entities.District;
import com.example.asm_be.entities.Province;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.UUID;
@Service
public interface AddressService {

    public List<Address> getAll();
    public Address getOne(int id);
    public Address save( Address address);
    public Address update( Address address);
    public void delete( Address address);
    public HashMap<Integer, String> fetchProvinces();
    public HashMap<Integer, String> fetchDistrict(int provinceId);
    public HashMap<String, String> fetchWard(int districtId);

}
