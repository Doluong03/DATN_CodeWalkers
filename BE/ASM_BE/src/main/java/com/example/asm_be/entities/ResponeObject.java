package com.example.asm_be.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResponeObject {
    private String status;

    private String massage;

    private Object data;
}
