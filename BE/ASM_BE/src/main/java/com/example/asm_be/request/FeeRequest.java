package com.example.asm_be.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class FeeRequest {
    private Integer districtId;
    private String wardId;
    private Integer quantity;

    public Integer getAvgEdge(){
        Double Vol = Math.pow((double) Invariable.EDGE_LENGTH, 3.0) * (double)this.quantity;
        return  (int)Math.cbrt(Vol);
    }

    public String getStringWard(){
        return String.valueOf(this.wardId);
    }
}
