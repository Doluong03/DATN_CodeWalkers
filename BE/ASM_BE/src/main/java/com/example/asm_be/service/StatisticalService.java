package com.example.asm_be.service;

import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public interface StatisticalService {
    List<Double> statisticsByDay(Date day);

    List<Double> statisticsByMonth(int month1,int month2);

    List<Double> statisticsByYear(int year);

    List<Integer> getSuccessfulInvoices();

    List<Integer> getTotalFailedInvoices();

    List<Integer> getPendingInvoices();

    List<Object[]> statisticsAmountByDay(Date sDay,Date eDay);

    List<Object[]> statisticsAmountByMonth(int sMonth, int eMonth, int sYear,int eYear);

    List<Object[]> statisticsAmountByYear(int sYear,int eYear);

    List<Object[]> getStock();

}
