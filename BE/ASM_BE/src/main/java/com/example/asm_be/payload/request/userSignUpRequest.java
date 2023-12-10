package com.example.asm_be.payload.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class userSignUpRequest {
    private String userName;

    private String password;

    private String phoneNumber;

    private String email;


}
