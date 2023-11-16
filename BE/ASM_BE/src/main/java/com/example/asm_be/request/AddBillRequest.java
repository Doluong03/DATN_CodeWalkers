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
public class AddBillRequest {
    private String userName;
    private Integer idBill;
    private Integer provinceId;
    private Integer districtId;
    private String wardId;
    private String address;
    private String note;
    private Double fee;
    private int optionPay;
    private Double totalPay;
    private Date shipDate;

    public Bill map(Bill bill){
        bill.setCreatedAt(new Date());
        bill.setAddress(this.address);
        bill.setDistrict(this.districtId);
        bill.setProvince(this.provinceId);
        bill.setWard(this.wardId);
        bill.setFee(this.fee);
        bill.setPaymentOptions(this.optionPay);
        bill.setTotalPay(this.totalPay);
        bill.setDescription(this.note);
        bill.setShipDate(this.shipDate);
        return bill;
    }


}
