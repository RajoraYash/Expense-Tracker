package com.yash.expensetracker.dto;

import java.math.BigDecimal;

public class CategoryExpense {
    private String category;
    private BigDecimal totalAmount;
    public CategoryExpense(String category,BigDecimal totalAmount){
        this.category = category;
        this.totalAmount = totalAmount;
    }
    public String getCategory(){
        return category;
    }
    public BigDecimal getTotalAmount(){
        return totalAmount;
    }
}
