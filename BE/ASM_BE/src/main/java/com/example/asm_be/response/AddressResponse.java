package com.example.asm_be.response;

import com.example.asm_be.entities.Address;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class AddressResponse {
    @JsonProperty("Id")
    private int id;
    @JsonProperty("AddressDetail")
    private String addressDetail;
    @JsonProperty("WardCode")
    private String wardCode;
    @JsonProperty("ProvinceID")
    private Integer provinceID;
    @JsonProperty("DistrictID")
    private Integer districtID;
    @JsonProperty("UserName")
    private String userName;
    @JsonProperty("PhoneNumber")
    private String phoneNumber;
    @JsonProperty("Email")
    private String email;

}
