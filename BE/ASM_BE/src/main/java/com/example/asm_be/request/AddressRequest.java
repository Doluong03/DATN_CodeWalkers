package com.example.asm_be.request;

import com.example.asm_be.entities.Address;
import com.example.asm_be.entities.Users;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.apache.catalina.User;
import org.hibernate.Hibernate;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class AddressRequest {
    private int id;
    private String addressDetail;
    private String ward;
    private int province;
    private int district;
    private String userName;
    private String phoneNumber;
    private String email;
    private Integer quantity;
    public Address map(Address address ) {
        address.setName(this.addressDetail);
        address.setProvince(this.province);
        address.setDistrict(this.district);
        address.setWard(this.ward);
        return address;
    }
}
