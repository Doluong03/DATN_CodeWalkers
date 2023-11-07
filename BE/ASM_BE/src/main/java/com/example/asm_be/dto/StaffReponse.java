package com.example.asm_be.dto;

import com.example.asm_be.entities.Product;
import com.example.asm_be.entities.Role;
import com.example.asm_be.entities.Staff;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StaffReponse {
    private List<Role> roleList;
    private List<Staff> staffList;
    private long totalPages;
}
