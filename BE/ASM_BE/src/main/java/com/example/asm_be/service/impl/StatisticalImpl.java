package com.example.asm_be.service.impl;

import com.example.asm_be.repositories.BillDetailsRepository;
import com.example.asm_be.repositories.BillRepository;
import com.example.asm_be.service.StatisticalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;

@Component
public class StatisticalImpl implements StatisticalService {

    @Autowired
    private BillDetailsRepository billDetailsRepository;


    @Override
    public List<Double> statisticsByDay(Date day) {
        return billDetailsRepository.getTotalPayByDay(day);
    }

    @Override
    public List<Double> statisticsByMonth(int month1,int month2) {
        return billDetailsRepository.getTotalPayByMonth(month1, month2);
    }

    @Override
    public List<Double> statisticsByYear(int year) {
        return billDetailsRepository.getTotalPayByYear(year);
    }

    @Override
    public List<Integer> getSuccessfulInvoices() {
        return billDetailsRepository.getSuccessfulInvoices();
    }

    @Override
    public List<Integer> getTotalFailedInvoices() {
        return billDetailsRepository.getTotalFailedInvoices();
    }

    @Override
    public List<Integer> getPendingInvoices() {
        return billDetailsRepository.getPendingInvoices();
    }

    @Override
    public List<Object[]> statisticsAmountByDay(Date sDay, Date eDay) {
        return billDetailsRepository.getTotalAmountByDay(sDay,eDay);
    }

    @Override
    public List<Object[]> statisticsAmountByMonth(int sMonth, int eMonth, int sYear,int eYear) {
        return billDetailsRepository.getTotalAmountByMonthRange(sMonth,eMonth,sYear,eYear);
    }

    @Override
    public List<Object[]> statisticsAmountByYear(int sYear, int eYear) {
        return billDetailsRepository.getTotalAmountByYear(sYear,eYear);
    }

    @Override
    public List<Object[]> getStock() {
        return billDetailsRepository.getStock();
    }


}
