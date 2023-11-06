package com.example.asm_be.request;

import com.example.asm_be.entities.Bill;
import com.example.asm_be.entities.Users;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class CreateOrder {
    private String note;
    private String toName;
    private String toPhone;
    private String toAddress;
    private Integer districtId;
    private String wardId;
    private Integer weight;
    private List<ProductDetailRequest> listItems;
    private Double avgVolume;
    private Integer quantity;
    private Integer optionsPay;
    private Double totalPay;

    public Integer getAvgEdge(){
        Double Vol = Math.pow((double) Invariable.EDGE_LENGTH, 3.0) * (double)this.quantity;
        return  (int)Math.cbrt(Vol);
    }
    public String getStringWard(){
        return String.valueOf(this.wardId);
    }

}
