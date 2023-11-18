package com.example.asm_be.service.impl;

import com.example.asm_be.entities.*;
import com.example.asm_be.repositories.*;
import com.example.asm_be.request.BillDetailsRequest;
import com.example.asm_be.service.BillDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
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
        List<CartDetails> listCartDt = cartDetailsRepository.findByCartId(idCart);
        Bill bill = billRepository.findById(idBill).orElse(null);
        List<BillDetails> billDetailsList = new ArrayList<>();
        if (bill != null) {
            for (CartDetails cartDetails : listCartDt) {
                BillDetails billDetail = new BillDetails();
                billDetail.setBill(bill);
                billDetail.setProductDetail(cartDetails.getProductDetail());
                billDetail.setQuantity(cartDetails.getQuantity());
                Optional<ProductDetail> productDetail = productDetailRepository.findById(cartDetails.getProductDetail().getId());
                ProductDetail prDtOut = productDetail.get();
                prDtOut.setQuantity(prDtOut.getQuantity() - cartDetails.getQuantity());
                productDetailRepository.save(prDtOut);
                billDetail.setPrice(cartDetails.getProductDetail().getPrice());
                billDetailsRepository.save(billDetail);
                billDetailsList.add(billDetail);
            }
        }
        return billDetailsList;
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
    public void update(int idBill , List<BillDetailsRequest> requestList) {
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
