package com.yash.expensetracker.dto;

import java.math.BigDecimal;

public class MonthlyExpense {
    private int year;
    private int month;
    private BigDecimal totalAmount;
    public MonthlyExpense(int year,int month,BigDecimal totalAmount){
        this.year = year;
        this.month = month;
        this.totalAmount = totalAmount;
    }

    public int getYear() {
        return year;
    }

    public int getMonth() {
        return month;
    }

    public BigDecimal getTotalAmount() {
        return totalAmount;
    }
}
