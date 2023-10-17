package com.example.asm_be.payload.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SingUpRequest {

    private String name;

    @JsonFormat(pattern = "dd/MM/yyyy")
    private Date dateOfBirth;

    private String phoneNumber;

    private Boolean gender;

    private String address;

    private String email;

    private String password;

    private String userName;

    private boolean status = true;

    private Set<String> listRoles;
}
