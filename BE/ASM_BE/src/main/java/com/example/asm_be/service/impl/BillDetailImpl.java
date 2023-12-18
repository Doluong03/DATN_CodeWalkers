package com.example.asm_be.service.impl;

import com.example.asm_be.entities.*;
import com.example.asm_be.repositories.*;
import com.example.asm_be.request.BillDetailsRequest;
import com.example.asm_be.service.BillDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

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
        List<CartDetails> listCartDt = cartDetailsRepository.findByCartId(idCart);
        Bill bill = billRepository.findById(idBill).orElse(null);
        List<BillDetails> billDetailsList = new ArrayList<>();
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
        return billDetailsList;
    }

    private void createNewBillDetails(Bill bill, ProductDetail productDetail, int quantity) {
        BillDetails billDetails = new BillDetails();
        billDetails.setQuantity(quantity);
        billDetails.setBill(bill);
        billDetails.setProductDetail(productDetail);
        billDetails.setPrice(productDetail.getPrice());
        billDetails.setCreatedAt(new Date());
//        productDetail.setQuantity(productDetail.getQuantity() - quantity);
//        productDetailRepository.save(productDetail);
        billDetailsRepository.save(billDetails);
    }
    @Override
    public boolean updateQuantity(int idBillDt, int quantity) {
        Optional<BillDetails> existingDetails = billDetailsRepository.findById(idBillDt);
        ProductDetail productDetail = productDetailRepository.findById(existingDetails.get().getProductDetail().getId()).orElse(null);
//        productDetail.setQuantity(existingDetails.get().getQuantity() + productDetail.getQuantity());
//        productDetailRepository.save(productDetail);
        int quantityFinal = 0;
        if (existingDetails.isPresent()) {
            if(quantity>productDetail.getQuantity()){
                quantityFinal = productDetail.getQuantity();
            }else {
                quantityFinal = quantity;
            }
            existingDetails.get().setQuantity(quantityFinal);
            billDetailsRepository.save(existingDetails.get());
//            productDetail.setQuantity(productDetail.getQuantity() - quantityFinal);
//            productDetailRepository.save(productDetail);
            return true;
        } else {
            return false;
        }

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
                    System.out.println(cartDetails.toString() + "aaaaaaaa111111");
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
            } else {
                System.out.println("ko co");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        // Trả về danh sách rỗng nếu hóa đơn không tồn tại
        return Collections.emptyList();
    }

    @Override
    @Transactional
    public void update(int idBill, List<BillDetailsRequest> requestList) {
        try {
            List<BillDetails> billDetailsList = billDetailsRepository.findByBillId(idBill);
            billDetailsList.forEach(billDetails -> {
                billDetails.getProductDetail()
                        .setQuantity(billDetails.getProductDetail().getQuantity()+billDetails.getQuantity());
                productDetailRepository.save(billDetails.getProductDetail());
            });
            billDetailsRepository.deleteAllByBillId(idBill);
            for (BillDetailsRequest x : requestList) {
                BillDetails details = new BillDetails();
                details.setProductDetail(productDetailRepository.findById(x.getPrDetailId()).get());

                Optional<Bill> bill = billRepository.findById(idBill);
                details.setBill(bill.get());
                details.getProductDetail()
                        .setQuantity(details.getProductDetail().getQuantity()-x.getQuantity());
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
        ProductDetail productDetail = billDetail.getProductDetail();
//        productDetail.setQuantity(productDetail.getQuantity() + billDetail.getQuantity());
//        productDetailRepository.save(productDetail);
        billDetailsRepository.delete(billDetail);
    }
}
