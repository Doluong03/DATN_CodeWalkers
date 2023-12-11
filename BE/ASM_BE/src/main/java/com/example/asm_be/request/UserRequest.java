package com.example.asm_be.request;


import com.example.asm_be.entities.Users;
import lombok.*;

import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class UserRequest {
    private int id;
    private String name;

    private Date dateOfBirth;

    private Date modified;

    private String phoneNumber;

    private Boolean gender;

    private String email;

    private String image;

    private String userName;

    public Users map (Users users){
        users.setName(this.name);
        users.setDateOfBirth(this.dateOfBirth);
        users.setModified(new Date());
        users.setPhoneNumber(this.phoneNumber);
        users.setGender(this.gender);
        users.setEmail(this.email);
        users.setImage(this.image);
        return users;
    }
}
