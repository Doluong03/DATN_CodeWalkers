package com.example.asm_be.response;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ProvineResponse {
    @JsonProperty("ProvinceID")
    private Integer provinceID;
    @JsonProperty("ProvinceName")
    private String provinceName;
}
