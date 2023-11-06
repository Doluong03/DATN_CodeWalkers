package com.example.asm_be.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResponObject {

     private String status;
     private String message;
     private Object data;
}
