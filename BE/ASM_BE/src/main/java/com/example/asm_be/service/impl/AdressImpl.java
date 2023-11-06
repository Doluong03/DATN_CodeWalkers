package com.example.asm_be.service.impl;

import com.example.asm_be.cache.DiaChiCache;
import com.example.asm_be.entities.Address;
import com.example.asm_be.repositories.AddressRepository;
import com.example.asm_be.response.BaseResponse;
import com.example.asm_be.response.DistrictResponse;
import com.example.asm_be.response.ProvineResponse;
import com.example.asm_be.response.WardResponse;
import com.example.asm_be.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Component
public class AdressImpl implements AddressService {
    @Autowired
    private AddressRepository addressRepository;
    @Autowired
    private RestTemplate restTemplate;

    @Override
    public List<Address> getAll() {
        return addressRepository.findAll();
    }

    @Override
    public Address getOne(int id) {
        return addressRepository.findById(id).get();
    }

    @Override
    public Address save(Address address) {
        return addressRepository.save(address);
    }

    @Override
    public Address update(Address address) {
        return addressRepository.save(address);
    }

    @Override
    public void delete(Address address) {
        addressRepository.delete(address);
    }

    private final String apiProvice = "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province";
    private final String apiDistrict = "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district";
    private final String apiWard = "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id";
    private final String token = "605bbb33-68e2-11ee-a6e6-e60958111f48";

    public List<ProvineResponse> fetchProvinces() {
        List<ProvineResponse> responseList = new ArrayList<>();
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.set("Token", token);
            headers.set("Content-Type", "application/json");
            HttpEntity<String> entity = new HttpEntity<>(headers);
            ResponseEntity<BaseResponse<List<ProvineResponse>>> response = restTemplate.exchange(
                    apiProvice, HttpMethod.GET, entity, new ParameterizedTypeReference<BaseResponse<List<ProvineResponse>>>() {
                    }
            );
           responseList = response.getBody().getData();
            Iterator var8 = responseList.iterator();
            while (var8.hasNext()) {
                ProvineResponse data = (ProvineResponse) var8.next();
                DiaChiCache.hashMapProvince.put(data.getProvinceID(), data.getProvinceName());
            }
        } catch (Exception var10) {
            System.out.println(var10);
        }
//        HashMap<Integer, String> fee = DiaChiCache.hashMapProvince;
//        for (Map.Entry<Integer, String> entry : fee.entrySet()) {
//            provineResponse.setProvinceID(entry.getKey());
//            provineResponse.setProvinceName(entry.getValue());
//        }
        return responseList;
    }

    @Override
    public List<DistrictResponse>  fetchDistrict(int provinceId) {
        List<DistrictResponse> responseList = new ArrayList<>();
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.set("Token", token);
            headers.set("Content-Type", "application/json");
            String body = "{\"province_id\": " + provinceId + "}";
            HttpEntity<String> entity = new HttpEntity<>(body, headers);
            ResponseEntity<BaseResponse<List<DistrictResponse>>> response = restTemplate.exchange(
                    apiDistrict, HttpMethod.POST, entity, new ParameterizedTypeReference<BaseResponse<List<DistrictResponse>>>() {
                    }
            );
           responseList = response.getBody().getData();
            HashMap<Integer, String> hashMapDistrict = new HashMap();
            Iterator var8 = responseList.iterator();
            while (var8.hasNext()) {
                DistrictResponse data = (DistrictResponse) var8.next();
                hashMapDistrict.put(data.getDistrictID(), data.getDistrictName());
            }
            DiaChiCache.hashMapDistrict.put(provinceId, hashMapDistrict);

        } catch (Exception var10) {
            System.out.println(var10);
        }

        return responseList;
    }

    @Override
    public List<WardResponse> fetchWard(int districtId) {
        List<WardResponse> responseList = new ArrayList<>();
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.set("Token", token);
            headers.set("Content-Type", "application/json");
            String body = "{\"district_id\": " + districtId + "}";
            HttpEntity<String> entity = new HttpEntity<>(body, headers);
            ResponseEntity<BaseResponse<List<WardResponse>>> response = restTemplate.exchange(
                    apiWard, HttpMethod.POST, entity, new ParameterizedTypeReference<BaseResponse<List<WardResponse>>>() {
                    }
            );
            responseList = response.getBody().getData();
            HashMap<String, String> hashMapWard = new HashMap();
            Iterator var8 = responseList.iterator();
            while (var8.hasNext()) {
                WardResponse data = (WardResponse) var8.next();
                hashMapWard.put(data.getWardCode(), data.getWardName());
            }
            DiaChiCache.hashMapWard.put(districtId, hashMapWard);

        } catch (Exception var10) {
            System.out.println(var10);
        }
        return responseList;
    }

    @Override
    public List<Address> getAllByUser(int idUser) {
        return addressRepository.findByUsersId(idUser);
    }
}
