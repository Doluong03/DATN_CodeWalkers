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
    private Integer userId;
    private List<BillDetailsRequest> billDetailsList;
    private Integer provinceId;
    private Integer districtId;
    private Integer wardId;
    private String address;
    private String note;
    private Integer quantity;
    private Double fee;

    public Bill map(Bill bill, Users users){
        bill.setCreatedAt(new Date());
        bill.setAddress(this.address);
        bill.setDistrict(this.districtId);
        bill.setProvince(this.provinceId);
        bill.setWard(this.wardId);
        bill.setFee(this.fee);
        bill.setUsers(users);
        return bill;
    }
}
