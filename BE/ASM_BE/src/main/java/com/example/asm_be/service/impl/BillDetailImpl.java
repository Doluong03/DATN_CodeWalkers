package com.example.asm_be.service.impl;

import com.example.asm_be.entities.*;
import com.example.asm_be.repositories.*;
import com.example.asm_be.request.BillDetailsRequest;
import com.example.asm_be.service.BillDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Component
public class BillDetailImpl implements BillDetailService {
    @Autowired
    private BillDetailsRepository billDetailsRepository;
    @Autowired
    private CartDetailsRepository cartDetailsRepository;
    @Autowired
    private ProductDetailRepository productDetailRepository;
    @Autowired
    private BillRepository billRepository;

    @Override
    public List<BillDetails> getAll(int idBill) {
        return billDetailsRepository.findByBillId(idBill);
    }

    @Override
    public BillDetails getOne(int id) {
        return billDetailsRepository.findById(id).get();
    }

    @Override
    public List<BillDetails> save(int idBill, int idCart) {
        List<BillDetails> billDetailsList = new ArrayList<>();
        try {
            List<CartDetails> listCartDt = cartDetailsRepository.findByCartId(idCart);
            Bill bill = billRepository.findById(idBill).orElse(null);
            if (bill != null) {
                for (CartDetails cartDetails : listCartDt) {
                    BillDetails billDetail = new BillDetails();
                    billDetail.setBill(bill);
                    billDetail.setProductDetail(cartDetails.getProductDetail());
                    billDetail.setQuantity(cartDetails.getQuantity());
                    billDetail.setPrice(cartDetails.getProductDetail().getPrice());
                    billDetailsRepository.save(billDetail);
                    billDetailsList.add(billDetail);
                }
            }
        }catch (Exception e){
            e.printStackTrace();
        }

        return billDetailsList;
    }

    @Override
    @Transactional
    public List<BillDetails> saveSl(int idBill, List<CartDetails> detailsList) {
        try {
            Bill bill = billRepository.findById(idBill).orElse(null);
            // Kiểm tra xem hóa đơn có tồn tại không
            if (bill != null) {
                // Xóa tất cả chi tiết hóa đơn cũ
                billDetailsRepository.deleteAllByBillId(idBill);
                // Thêm mới chi tiết hóa đơn từ danh sách chi tiết giỏ hàng
                List<BillDetails> billDetailsList = new ArrayList<>();
                for (CartDetails cartDetails : detailsList) {
                    System.out.println(cartDetails.toString()+"aaaaaaaa111111");
                    BillDetails billDetail = new BillDetails();
                    billDetail.setBill(bill);
                    billDetail.setProductDetail(cartDetails.getProductDetail());
                    billDetail.setQuantity(cartDetails.getQuantity());
                    billDetail.setPrice(cartDetails.getProductDetail().getPrice());
                    billDetailsRepository.save(billDetail);
                    billDetailsList.add(billDetail);
                }
                // Trả về danh sách chi tiết hóa đơn mới
                return billDetailsList;
            }else {
                System.out.println("ko co");
            }
        }catch (Exception e){
            e.printStackTrace();
        }
        // Trả về danh sách rỗng nếu hóa đơn không tồn tại
        return Collections.emptyList();
    }

    @Override
    public Double getTongGia(List<BillDetailsRequest> list) {
        Double result = 0.0;

        for (int i = 0; i < list.size(); ++i) {
            Double giaBan = 0.0;
            ProductDetail ctsp = this.productDetailRepository.findById((list.get(i)).getPrDetailId()).get();
            if (ctsp.getPromotional() != null) {
                giaBan = ctsp.getPrice() - ctsp.getPrice() * ctsp.getPromotional().getValue() / 100.0;
            } else {
                giaBan = ctsp.getPrice();
            }
            result = result + (double) (list.get(i)).getQuantity() * giaBan;
        }
        return result;
    }


    @Override
    @Transactional
    public void update(int idBill, List<BillDetailsRequest> requestList) {
        try {
            billDetailsRepository.deleteAllByBillId(idBill);
            for (BillDetailsRequest x : requestList) {
                BillDetails details = new BillDetails();
                details.setProductDetail(productDetailRepository.findById(x.getPrDetailId()).get());

                Optional<Bill> bill = billRepository.findById(idBill);
                details.setBill(bill.get());

                details.setQuantity(x.getQuantity());
                details.setPrice(x.getPrice());
                billDetailsRepository.save(details);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


    @Override
    public void delete(BillDetails billDetail) {
        billDetailsRepository.delete(billDetail);
    }
}
