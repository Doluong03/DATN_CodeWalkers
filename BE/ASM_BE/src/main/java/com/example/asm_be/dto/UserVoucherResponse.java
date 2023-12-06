package com.example.asm_be.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserVoucherResponse {

    private Integer id;

    private String code;

    private String name;

    private String description;

    private double value;

//    @JsonFormat(pattern = "dd-MM-yyyy", timezone = "GMT+7")
    @JsonSerialize(using = CustomDateSerializer.class)
    private Date endDate;

    private boolean status;

    private String image;

    private String useForm;

    private double condition;

    private double maxReduction;

//    private Integer quantity;

    private String discountType;

    private Integer customType;

    private Integer usageCount;

    private boolean voucherStatus;
    private Integer idVchUser;


}
