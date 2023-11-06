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
public class DistrictResponse {
    @JsonProperty("ProvinceID")
    private Integer provinceID;
    @JsonProperty("DistrictID")
    private Integer districtID;
    @JsonProperty("DistrictName")
    private String districtName;

}
