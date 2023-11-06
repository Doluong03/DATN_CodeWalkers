package com.example.asm_be.dto;

import com.example.asm_be.entities.Users;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserRespone {

    private List<Users> usersList;
    private long totalPages;
}
