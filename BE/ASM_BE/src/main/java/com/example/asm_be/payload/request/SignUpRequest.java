package com.example.asm_be.payload.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignUpRequest {

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

    private String image;

    private Set<String> listRoles;
}
