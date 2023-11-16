package com.example.asm_be.service.impl;

import com.example.asm_be.configuration.VNpayConfig;
import com.example.asm_be.entities.Bill;
import com.example.asm_be.entities.ProductDetail;
import com.example.asm_be.entities.Staff;
import com.example.asm_be.entities.Users;
import com.example.asm_be.repositories.BillRepository;
import com.example.asm_be.repositories.StaffRepository;
import com.example.asm_be.repositories.UserRepository;
import com.example.asm_be.request.*;
import com.example.asm_be.response.FeeResponse;
import com.example.asm_be.service.BillService;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.data.domain.Sort;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.concurrent.atomic.AtomicLong;

@Component
public class BillImpl implements BillService {
    @Autowired
    private BillRepository billRepository;
    @Autowired
    private StaffRepository staffRepository;
    // API
    @Autowired
    private UserRepository userRepository;
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
    public List<Bill> getByUser(int id) {
        return billRepository.findByUsersId(id);
    }

    @Override
    public Page<Bill> getAllPage(Integer pageNo, Integer sizePage) {
        Pageable pageable = PageRequest.of(pageNo, sizePage);
        return billRepository.findAllByStatusNotOrderByIdDesc(0, pageable);
    }

    @Override
    public Page<Bill> getAllPageByStatsus(Integer pageNo, Integer sizePage, int status) {
        Pageable pageable = PageRequest.of(pageNo, sizePage);
        return billRepository.findAllByStatusOrderByIdDesc(status, pageable);
    }

    @Override
    public Bill getOne(int id) {
        return billRepository.findById(id).get();
    }

    @Override
    public Bill save(Bill bill, Users user) {
        bill.setCreatedAt(new Date());
        String invoiceCode = generateInvoiceCode();
        bill.setCode("HD" + invoiceCode);
        bill.setDescription("Khách lẻ");
        Staff staff = staffRepository.findById(1).get();
        bill.setStaff(staff);
        // Users usersRes = new Users();
        // usersRes.setName("Khách lẻ");
        // userRepository.save(usersRes);
        bill.setUsers(user);
        bill.setStatus(0);
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

    @Override
    public String update(AddBillRequest billRequest) {
        Optional<Bill> bill = billRepository.findById(billRequest.getIdBill());
        try {
            if (bill.isPresent()) {
                Optional<Users> users = userRepository.findById(Integer.valueOf(billRequest.getUserName()));
                if (users.isPresent()) {
                    bill.get().setUsers(users.get());
                }
                billRequest.map(bill.get());
                bill.get().setStatus(1);
                billRepository.save(bill.get());
                if (bill.get().getPaymentOptions() == Invariable.VNPAY) {
                    try {
                        int amount = bill.get().getTotalPay().intValue();
                        Gson gson = (new GsonBuilder()).setPrettyPrinting().create();
                        String jsonString = gson.toJson(paymentVnPay(amount));
                        System.out.println(jsonString);
                        return jsonString;
                    } catch (UnsupportedEncodingException e) {
                        // Xử lý ngoại lệ một cách thích hợp ở đây
                        e.printStackTrace(); // Hoặc ghi log, hoặc trả về thông báo lỗi
                    }
                } else {
                    Gson gson = (new GsonBuilder()).setPrettyPrinting().create();
                    String jsonString = gson.toJson("http://127.0.0.1:5501/layoutUser.html#/orderOverview");
                    System.out.println(jsonString);
                    return jsonString;
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
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

    private String generateInvoiceCode() {
        // Kiểm tra xem có hóa đơn nào trong cơ sở dữ liệu hay không
        long nextUniqueNumber = 1000; // Giá trị mặc định khi không có hóa đơn

        Optional<Bill> lastBill = billRepository.findTopByOrderByIdDesc();
        if (lastBill.isPresent()) {
            // Nếu có hóa đơn trong cơ sở dữ liệu, sử dụng số cuối cùng trong mã hóa đơn
            String lastBillCode = lastBill.get().getCode();
            int lastInvoiceNumber = Integer.parseInt(lastBillCode.substring(5));
            nextUniqueNumber = lastInvoiceNumber + 1;
        }

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
            StringBuilder body = new StringBuilder("{\"to_district_id\": " + feeRequest.getDistrictId() + ",");
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
    public Object createOrder(CreateOrder createOrder) {
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
                body.addProperty("payment_type_id", 2);
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
            return responseMap.get("data");
        } catch (Exception var10) {
            var10.printStackTrace();
            System.out.println(var10);
        }
        return null;
    }

    public String paymentVnPay(int totalPay) throws UnsupportedEncodingException {
        String orderType = "other";
        totalPay = totalPay * 100;
        String vnp_TxnRef = VNpayConfig.getRandomNumber(8);
        String vnp_IpAddr = ("127.0.0.1");
        String vnp_TmnCode = VNpayConfig.vnp_TmnCode;
        Map<String, String> vnp_Params = new HashMap<>();
        vnp_Params.put("vnp_Version", VNpayConfig.vnp_Version);
        vnp_Params.put("vnp_Command", VNpayConfig.vnp_Command);
        vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
        vnp_Params.put("vnp_Amount", String.valueOf(totalPay));
        vnp_Params.put("vnp_CurrCode", "VND");
        vnp_Params.put("vnp_BankCode", "NCB");
        vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
        vnp_Params.put("vnp_Locale", "vn");
        vnp_Params.put("vnp_OrderInfo", "Thanh toan don hang:" + vnp_TxnRef);
        vnp_Params.put("vnp_ReturnUrl", VNpayConfig.vnp_ReturnUrl);
        vnp_Params.put("vnp_OrderType", orderType);
        vnp_Params.put("vnp_IpAddr", vnp_IpAddr);
        Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        String vnp_CreateDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_CreateDate", vnp_CreateDate);

        cld.add(Calendar.MINUTE, 15);
        String vnp_ExpireDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);

        List fieldNames = new ArrayList(vnp_Params.keySet());
        Collections.sort(fieldNames);
        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();
        Iterator itr = fieldNames.iterator();
        while (itr.hasNext()) {
            String fieldName = (String) itr.next();
            String fieldValue = (String) vnp_Params.get(fieldName);
            if ((fieldValue != null) && (fieldValue.length() > 0)) {
                // Build hash data
                hashData.append(fieldName);
                hashData.append('=');
                hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                // Build query
                query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII.toString()));
                query.append('=');
                query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                if (itr.hasNext()) {
                    query.append('&');
                    hashData.append('&');
                }
            }
        }
        String queryUrl = query.toString();
        String vnp_SecureHash = VNpayConfig.hmacSHA512(VNpayConfig.secretKey, hashData.toString());
        queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;
        String paymentUrl = VNpayConfig.vnp_PayUrl + "?" + queryUrl;
        return paymentUrl;
    }

    @Override
    public void updateStatus(Integer idBill, int status) {
        try {
            Optional<Bill> bill = billRepository.findById(idBill);
            if (bill.isPresent()) {
                bill.get().setStatus(status);
                this.billRepository.save(bill.get());
            }
        } catch (Exception var3) {
            var3.printStackTrace();
        }
    }
}
