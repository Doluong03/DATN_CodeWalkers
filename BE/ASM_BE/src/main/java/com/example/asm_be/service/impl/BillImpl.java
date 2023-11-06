package com.example.asm_be.service.impl;

import com.example.asm_be.entities.Bill;
import com.example.asm_be.entities.Staff;
import com.example.asm_be.entities.Users;
import com.example.asm_be.repositories.BillRepository;
import com.example.asm_be.repositories.StaffRepository;
import com.example.asm_be.request.*;
import com.example.asm_be.response.FeeResponse;
import com.example.asm_be.service.BillService;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicLong;

@Component
public class BillImpl implements BillService {
    @Autowired
    private BillRepository billRepository;
    @Autowired
    private StaffRepository staffRepository;
    // API
    private static final String FeeAPI = "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee";
    private static final String CreateOrderAPI = "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/create";
    //
    @Autowired
    private RestTemplate restTemplate;

    @Override
    public Page<Bill> getAll(Integer pageNo, Integer sizePage) {
        Pageable pageable = PageRequest.of(pageNo, sizePage);
        return billRepository.findAll(pageable);
    }

    @Override
    public Bill getOne(int id) {
        return billRepository.findById(id).get();
    }

    @Override
    public Bill save(Bill bill) {
        bill.setCreatedAt(new Date());
        String invoiceCode = generateInvoiceCode();
        bill.setCode("HD" + invoiceCode);
        bill.setDescription("Khách lẻ");
        Staff staff = staffRepository.findById(1).get();
        bill.setStaff(staff);
        return billRepository.save(bill);
    }

    public boolean saveAdmin(Bill bill) {
        try {
            // Bill bill=new Bill();
            // billRequest.map1(bill);
            billRepository.save(bill);
            return true;
        } catch (Exception var3) {
            var3.printStackTrace();
            return false;
        }
    }

    // @Override
    // public Bill createOrder(AddBillRequest billRequest, Users users){
    // Bill bill = new Bill();
    // billRequest.map(bill,users);
    // return bill;
    // }
    @Override
    public boolean update(BillRequest1 billRequest) {
        try {
            Bill bill = new Bill();
            billRequest.map(bill);
            this.billRepository.save(bill);
            return true;
        } catch (Exception var4) {
            var4.getMessage();
            return false;
        }
    }

    @Override
    public boolean delete(Integer idBill) {
        try {
            this.billRepository.deleteById(idBill);
            return true;
        } catch (Exception var3) {
            var3.getMessage();
            return false;
        }
    }

    // Hàm tạo mã random
    private static AtomicLong uniqueInvoiceCounter = new AtomicLong(1000); // Bắt đầu từ số 1000

    public static String generateInvoiceCode() {
        long nextUniqueNumber = uniqueInvoiceCounter.getAndIncrement();
        return "INV" + nextUniqueNumber;
    }

    // @Override
    // public Bill createOrder(AddBillRequest billRequest, Users users){
    // Bill bill = new Bill();
    // billRequest.map(bill,users);
    // return bill;
    // }
    @Override
    public Integer getFee(FeeRequest feeRequest) {
        FeeResponse feeResponse = new FeeResponse();
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.set("Token", Invariable.TOKEN);
            headers.set("Content-Type", Invariable.CONTENT_TYPE);
            headers.set("Shop_id", Invariable.SHOP_ID);
            StringBuilder body = new StringBuilder("{\"to_district_id\": " + feeRequest.getDítrictId() + ",");
            body.append(" \"from_district_id\": " + Invariable.DISTRICT_SHOP + " ,");
            body.append(" \"to_ward_code\": \"" + feeRequest.getStringWard() + "\" ,");
            body.append(" \"service_type_id\":2 ,");
            body.append(" \"height\":" + feeRequest.getAvgEdge() + " ,");
            body.append(" \"length\":" + feeRequest.getAvgEdge() + " ,");
            body.append(" \"width\":" + feeRequest.getAvgEdge() + " ,");
            int quantity = feeRequest.getQuantity();
            body.append(" \"weight\":" + (quantity * Invariable.WEIGHT) + " }");
            HttpEntity<String> entity = new HttpEntity<>(body.toString(), headers);
            ResponseEntity<Map> response = restTemplate.exchange(
                    FeeAPI, HttpMethod.POST, entity, new ParameterizedTypeReference<Map>() {
                    });
            Map<String, Object> responseMap = response.getBody();
            Map<String, Object> fee = (Map<String, Object>) responseMap.get("data");
            feeResponse.setTotal((Integer) fee.get("total"));
            return feeResponse.getTotal();
        } catch (Exception var10) {
            System.out.println(var10);
        }
        return feeResponse.getTotal();
    }

    @Override
    public Integer createOrder(CreateOrder createOrder) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.set("Token", Invariable.TOKEN);
            headers.set("Content-Type", Invariable.CONTENT_TYPE);
            headers.set("Shop_id", Invariable.SHOP_ID);
            JsonObject body = new JsonObject();
            body.addProperty("to_district_id", createOrder.getDistrictId());
            body.addProperty("to_ward_code", String.valueOf(createOrder.getWardId()));
            body.addProperty("to_address", createOrder.getToAddress());
            body.addProperty("note", createOrder.getNote());
            body.addProperty("required_note", Invariable.REQUIRED_NOTE);
            body.addProperty("to_name", createOrder.getToName());
            body.addProperty("to_phone", createOrder.getToPhone());
            // body.addProperty("from_ward_code", String.valueOf(Invariable.WARD_SHOP));
            body.addProperty("service_type_id", 2);
            body.addProperty("height", createOrder.getAvgEdge());
            body.addProperty("length", createOrder.getAvgEdge());
            body.addProperty("width", createOrder.getAvgEdge());
            body.addProperty("weight", createOrder.getQuantity() * Invariable.WEIGHT);
            if (createOrder.getOptionsPay() == Invariable.TRA_SAU) {
                body.addProperty("cod_amount", createOrder.getTotalPay().intValue());
                body.addProperty("payment_type_id", 2);
            } else if (createOrder.getOptionsPay() == Invariable.VNPAY) {
                body.addProperty("payment_type_id", 1);
            } else {
                body.addProperty("payment_type_id", 1);
            }
            JsonArray items = new JsonArray();
            createOrder.getListItems().forEach((item) -> {
                JsonObject covertJO = new JsonObject();
                covertJO.addProperty("name", item.getName());
                covertJO.addProperty("quantity", item.getQuantity());
                covertJO.addProperty("price", item.getPrice().intValue());
                covertJO.addProperty("id", item.getProductDetail().getId());
                items.add(covertJO);
            });
            body.add("items", items);
            Gson gson = (new GsonBuilder()).setPrettyPrinting().create();
            String jsonString = gson.toJson(body);
            System.out.println(jsonString);
            HttpEntity<String> entity = new HttpEntity<>(jsonString, headers);
            ResponseEntity<Map> response = restTemplate.exchange(
                    CreateOrderAPI, HttpMethod.POST, entity, new ParameterizedTypeReference<Map>() {
                    });
            Map<String, Object> responseMap = response.getBody();
            return (Integer) responseMap.get("code");
        } catch (Exception var10) {
            var10.printStackTrace();
            System.out.println(var10);
        }
        return null;
    }

    // Hàm tạo mã random
    private static AtomicLong uniqueInvoiceCounter = new AtomicLong(1000); // Bắt đầu từ số 1000

    public static String generateInvoiceCode() {
        long nextUniqueNumber = uniqueInvoiceCounter.getAndIncrement();
        return "INV" + nextUniqueNumber;
    }

    @Override
    public Integer getFee(FeeRequest feeRequest) {
        FeeResponse feeResponse = new FeeResponse();
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.set("Token", Invariable.TOKEN);
            headers.set("Content-Type", Invariable.CONTENT_TYPE);
            headers.set("Shop_id", Invariable.SHOP_ID);
            StringBuilder body = new StringBuilder("{\"to_district_id\": " + feeRequest.getDítrictId() + ",");
            body.append(" \"from_district_id\": " + Invariable.DISTRICT_SHOP + " ,");
            body.append(" \"to_ward_code\": \"" + feeRequest.getStringWard() + "\" ,");
            body.append(" \"service_type_id\":2 ,");
            body.append(" \"height\":" + feeRequest.getAvgEdge() + " ,");
            body.append(" \"length\":" + feeRequest.getAvgEdge() + " ,");
            body.append(" \"width\":" + feeRequest.getAvgEdge() + " ,");
            int quantity = feeRequest.getQuantity();
            body.append(" \"weight\":" + (quantity * Invariable.WEIGHT) + " }");
            HttpEntity<String> entity = new HttpEntity<>(body.toString(), headers);
            ResponseEntity<Map> response = restTemplate.exchange(
                    FeeAPI, HttpMethod.POST, entity, new ParameterizedTypeReference<Map>() {
                    });
            Map<String, Object> responseMap = response.getBody();
            Map<String, Object> fee = (Map<String, Object>) responseMap.get("data");
            feeResponse.setTotal((Integer) fee.get("total"));
            return feeResponse.getTotal();
        } catch (Exception var10) {
            System.out.println(var10);
        }
        return feeResponse.getTotal();
    }

    @Override
    public Integer createOrder(CreateOrder createOrder) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.set("Token", Invariable.TOKEN);
            headers.set("Content-Type", Invariable.CONTENT_TYPE);
            headers.set("Shop_id", Invariable.SHOP_ID);
            JsonObject body = new JsonObject();
            body.addProperty("to_district_id", createOrder.getDistrictId());
            body.addProperty("to_ward_code", String.valueOf(createOrder.getWardId()));
            body.addProperty("to_address", createOrder.getToAddress());
            body.addProperty("note", createOrder.getNote());
            body.addProperty("required_note", Invariable.REQUIRED_NOTE);
            body.addProperty("to_name", createOrder.getToName());
            body.addProperty("to_phone", createOrder.getToPhone());
            // body.addProperty("from_ward_code", String.valueOf(Invariable.WARD_SHOP));
            body.addProperty("service_type_id", 2);
            body.addProperty("height", createOrder.getAvgEdge());
            body.addProperty("length", createOrder.getAvgEdge());
            body.addProperty("width", createOrder.getAvgEdge());
            body.addProperty("weight", createOrder.getQuantity() * Invariable.WEIGHT);
            if (createOrder.getOptionsPay() == Invariable.TRA_SAU) {
                body.addProperty("cod_amount", createOrder.getTotalPay().intValue());
                body.addProperty("payment_type_id", 2);
            } else if (createOrder.getOptionsPay() == Invariable.VNPAY) {
                body.addProperty("payment_type_id", 1);
            } else {
                body.addProperty("payment_type_id", 1);
            }
            JsonArray items = new JsonArray();
            createOrder.getListItems().forEach((item) -> {
                JsonObject covertJO = new JsonObject();
                covertJO.addProperty("name", item.getName());
                covertJO.addProperty("quantity", item.getQuantity());
                covertJO.addProperty("price", item.getPrice().intValue());
                covertJO.addProperty("id", item.getProductDetail().getId());
                items.add(covertJO);
            });
            body.add("items", items);
            Gson gson = (new GsonBuilder()).setPrettyPrinting().create();
            String jsonString = gson.toJson(body);
            System.out.println(jsonString);
            HttpEntity<String> entity = new HttpEntity<>(jsonString, headers);
            ResponseEntity<Map> response = restTemplate.exchange(
                    CreateOrderAPI, HttpMethod.POST, entity, new ParameterizedTypeReference<Map>() {
                    });
            Map<String, Object> responseMap = response.getBody();
            return (Integer) responseMap.get("code");
        } catch (Exception var10) {
            var10.printStackTrace();
            System.out.println(var10);
        }
        return null;
    }
}
