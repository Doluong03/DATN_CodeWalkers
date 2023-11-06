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
public class WardResponse {
    @JsonProperty("DistrictID")
    private Integer districtID;
    @JsonProperty("WardCode")
    private String wardCode;
    @JsonProperty("WardName")
    private String wardName;

}
