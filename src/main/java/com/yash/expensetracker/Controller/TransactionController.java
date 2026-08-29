package com.yash.expensetracker.Controller;

import com.yash.expensetracker.Repository.TransactionRepository;
import com.yash.expensetracker.Service.TransactionService;
import com.yash.expensetracker.Transaction.Transaction;
import com.yash.expensetracker.dto.CategoryExpense;
import com.yash.expensetracker.dto.MonthlyExpense;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

import static org.springframework.data.jpa.domain.AbstractPersistable_.id;

@RestController
public class TransactionController {
    private final TransactionService transactionService;
    public TransactionController(TransactionService transactionService){
        this.transactionService = transactionService;
    }
    @PostMapping("/transactions")
    public Transaction addTransaction( @Valid  @RequestBody Transaction transaction){
        return transactionService.addTransaction(transaction);
    }
    @GetMapping("/transactions")
    public List<Transaction> getAllTransactions(){
        return transactionService.getAllTransactions();
    }
    @GetMapping("/transactions/{id}")
    public Transaction getTransactionById(@PathVariable Long id){
        return transactionService.getTransactionById(id);
    }
    @DeleteMapping("/transactions/{id}")
    public void deleteTransactionById(@PathVariable Long id){
        transactionService.deleteTransactionById(id);
    }
    @PutMapping("/transactions/{id}")
    public Transaction updateTransaction(@PathVariable Long id,
    @RequestBody Transaction transaction){
        return transactionService.updateTransaction(id,transaction);
    }
    @GetMapping("/analytics/expenses")
    public BigDecimal getTotalExpenses(){
        return transactionService.getTotalExpenses();
    }
    @GetMapping("/analytics/income")
    public BigDecimal getTotalIncome(){
        return transactionService.getTotalIncome();
    }
    @GetMapping("/analytics/balance")
    public BigDecimal getBalance(){
        return transactionService.getBalance();
    }
    @GetMapping("/analytics/category")
    public List<CategoryExpense> getCategoryWiseExpenses() {
        return transactionService.getCategoryWiseExpenses();
    }
    @GetMapping("/analytics/monthly")
    public List<MonthlyExpense> getMonthlyExpenses(){
        return transactionService.getMonthlyExpenses();
    }
}

