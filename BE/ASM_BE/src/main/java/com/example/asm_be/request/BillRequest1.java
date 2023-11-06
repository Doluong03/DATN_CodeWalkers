package com.example.asm_be.request;

import com.example.asm_be.entities.Bill;
import com.example.asm_be.entities.Staff;
import com.example.asm_be.entities.Users;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BillRequest1 {
    private Integer id;
    private String code;
    private String moTa;
    private String diaChiChiTiet;
    private Integer phuongXa;
    private Integer thanhPho;
    private Integer quanHuyen;
    private Date ngayLap;
    private Date ngayGiao;
    private Double phiGiaoHang;
    private Double tongTien;
    private Integer phuongThuc;
    private Integer users;
    private Integer staff;
    private boolean status;
    public Bill map1(Bill bill){
        bill.setCode(this.code);
        bill.setMoTa(this.moTa);
        bill.setNgayLap(this.ngayLap);
        bill.setDiaChiChiTiet(this.diaChiChiTiet);
        bill.setPhuongXa(this.phuongXa);
        bill.setQuanHuyen(this.quanHuyen);
        bill.setThanhPho(this.thanhPho);
        bill.setNgayGiao(this.ngayGiao);
        bill.setPhiGiaoHang(this.phiGiaoHang);
        bill.setTongTien(this.tongTien);
        bill.setPhuongThuc(this.phuongThuc);
        bill.setStatus(this.status);
        Users users1=new Users();
        users1.setId(this.users);
        bill.setUsers(users1);
        Staff staff =new Staff();
        staff.setId(this.staff);
        bill.setStaff(staff);
        return bill;
    }
    public Bill map(Bill bill){
        bill.setId(this.id);
        bill.setCode(this.code);
        bill.setMoTa(this.moTa);
        bill.setNgayLap(this.ngayLap);
        bill.setDiaChiChiTiet(this.diaChiChiTiet);
        bill.setPhuongXa(this.phuongXa);
        bill.setQuanHuyen(this.quanHuyen);
        bill.setThanhPho(this.thanhPho);
        bill.setNgayGiao(this.ngayGiao);
        bill.setPhiGiaoHang(this.phiGiaoHang);
        bill.setTongTien(this.tongTien);
        bill.setPhuongThuc(this.phuongThuc);
        bill.setStatus(this.status);
        Users users1=new Users();
        users1.setId(this.users);
        bill.setUsers(users1);
        Staff staff =new Staff();
        staff.setId(this.staff);
        bill.setStaff(staff);
        return bill;
    }

}
