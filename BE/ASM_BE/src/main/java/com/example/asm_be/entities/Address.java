package com.example.asm_be.entities;


import com.example.asm_be.response.AddressResponse;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Entity(name = "DiaChi")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "DiaChi")
public class Address {
    @Id
    @Column(name = "id_dia_chi")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "dia_chi_chi_tiet")
    private String name;
    @Column(name = "phuong_xa_id")
    private String ward;
    @Column(name = "thanh_pho_id")
    private int province;
    @Column(name = "quan_huyen_id")
    private int district;
    @ManyToOne
    @JoinColumn(name = "khach_hang_id")
    private Users users;
    @Column(name = "ten_khach_hang")
    private String userName;
    @Column(name = "sdt_khach_hang")
    private String userPhone;

    public AddressResponse map (AddressResponse addressResponse){
        addressResponse.setId(this.id);
        addressResponse.setAddressDetail(this.name);
        addressResponse.setEmail(this.users.getEmail());
        addressResponse.setDistrictID(this.district);
        addressResponse.setPhoneNumber(this.userPhone);
        addressResponse.setProvinceID(this.province);
        addressResponse.setWardCode(this.ward);
        addressResponse.setUserName(this.userName);
        return addressResponse;
    }
}
