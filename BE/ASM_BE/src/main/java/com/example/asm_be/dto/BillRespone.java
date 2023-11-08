package com.example.asm_be.dto;


import com.example.asm_be.entities.*;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BillRespone {
    private int id;
    private String code;
    private String description;
    private String address;
    private String ward;
    private int province;
    private int district;
    private Date shipDate;
    private Double fee;
    private Double totalPay;
    private int paymentOptions;
    private Date createdAt;
    @JsonFormat(with = JsonFormat.Feature.ACCEPT_SINGLE_VALUE_AS_ARRAY)
    private List<Users> users;
    private int status;
    @JsonFormat(with = JsonFormat.Feature.ACCEPT_SINGLE_VALUE_AS_ARRAY)
    private List<Staff> staff;
    private List<BillDetails> listBillDetail;
    private long totalPages;
}
