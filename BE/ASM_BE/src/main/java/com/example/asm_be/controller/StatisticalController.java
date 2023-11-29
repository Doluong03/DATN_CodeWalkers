package com.example.asm_be.controller;

import com.example.asm_be.dto.AmountRespone;
import com.example.asm_be.dto.InvoiceResponse;
import com.example.asm_be.service.StatisticalService;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

@CrossOrigin({"*"})
@RestController
@RequestMapping({"/CodeWalkers"})
public class StatisticalController {

    @Autowired
    private StatisticalService statisticalService;

    @PostMapping("/thong-ke/nam")
    public List<Double> doanhThuNam(@RequestParam(value = "year") int year) {
        return statisticalService.statisticsByYear(year);
    }

    @PostMapping("/thong-ke/thang")
    public ResponseEntity<List<Double>> doanhThuThang(
            @RequestParam(value = "month") int month,
            @RequestParam(value = "month2") int month2) {

        List<Double> statistics = statisticalService.statisticsByMonth(month, month2);

        if (statistics != null && !statistics.isEmpty()) {
            return new ResponseEntity<>(statistics, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }

    @PostMapping("/thong-ke/ngay")
    public ResponseEntity<List<Double>> doanhThuNgay(
            @RequestParam(value = "day") String Day) {

        try {
            // Định dạng chuỗi ngày thành đối tượng Date
            SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");
            Date date = dateFormat.parse(Day);

            // Bây giờ 'date' là đối tượng Date
            List<Double> statistics = statisticalService.statisticsByDay(date);
            if (statistics != null && !statistics.isEmpty()) {

                return new ResponseEntity<>(statistics, HttpStatus.OK);

            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

        } catch (ParseException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/thong-ke/invoice")
    public ResponseEntity<InvoiceResponse> Invoice() {
        Map<String, List<Integer>> invoiceResponses = new HashMap();
        List<Integer> listSuccess = statisticalService.getSuccessfulInvoices();
        List<Integer> listPending = statisticalService.getPendingInvoices();
        List<Integer> listFailed = statisticalService.getTotalFailedInvoices();

        invoiceResponses.put("Success", listSuccess);
        invoiceResponses.put("Failed", listFailed);
        invoiceResponses.put("Pending", listPending);

        return new ResponseEntity(invoiceResponses, HttpStatus.OK);
    }


    @PostMapping("/doanh-so/nam")
    public List<AmountRespone> doanhSoNam(
            @RequestParam(value = "sYear") int sYear,
            @RequestParam(value = "eYear") int eYear) {
        List<Object[]> list = statisticalService.statisticsAmountByYear(sYear, eYear);
        List<AmountRespone> amountResponses = list.stream()
                .map(tem -> {
                    AmountRespone amountResponse = new AmountRespone();
                    amountResponse.setTenLoai((String) tem[0]);
                    amountResponse.setSoLuong((Long) tem[1]);
                    return amountResponse;
                })
                .collect(Collectors.toList());
        return amountResponses;
    }

    @PostMapping("/doanh-so/thang")
    public List<AmountRespone> doanhSoThang(
            @RequestParam(value = "sMonth") int sMonth,
            @RequestParam(value = "eMonth") int eMonth,
            @RequestParam(value = "sYear") int sYear,
            @RequestParam(value = "eYear") int eYear) {
        List<Object[]> list = statisticalService.statisticsAmountByMonth(sMonth, eMonth, sYear,eYear);
        List<AmountRespone> amountResponses = list.stream()
                .map(tem -> {
                    AmountRespone amountResponse = new AmountRespone();
                    amountResponse.setTenLoai((String) tem[0]);
                    amountResponse.setSoLuong((Long) tem[1]);
                    return amountResponse;
                })
                .collect(Collectors.toList());
        return amountResponses;
    }

    @SneakyThrows
    @PostMapping("/doanh-so/ngay")
    public List<AmountRespone> doanhSoNgay(
            @RequestParam(value = "sDay") String sDay,
            @RequestParam(value = "eDay") String eDay) {

        // Định dạng chuỗi ngày thành đối tượng Date
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");
        Date sDate = dateFormat.parse(sDay);
        Date eDate = dateFormat.parse(eDay);

        List<Object[]> list = statisticalService.statisticsAmountByDay(sDate, eDate);
        List<AmountRespone> amountResponses = list.stream()
                .map(tem -> {
                    AmountRespone amountResponse = new AmountRespone();
                    amountResponse.setTenLoai((String) tem[0]);
                    amountResponse.setSoLuong((Long) tem[1]);
                    return amountResponse;
                })
                .collect(Collectors.toList());
        return amountResponses;
    }

    @GetMapping("/ton")
    public  ResponseEntity<List<Object[]>> tonKho(){

         List<Object[]> list = statisticalService.getStock();

            return new ResponseEntity<>(list, HttpStatus.OK);

    }
}



