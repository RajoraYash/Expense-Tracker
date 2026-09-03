package com.yash.expensetracker.Controller;

import com.yash.expensetracker.Repository.TransactionRepository;
import com.yash.expensetracker.Service.TransactionService;
import com.yash.expensetracker.Transaction.Transaction;
import com.yash.expensetracker.dto.CategoryExpense;
import com.yash.expensetracker.dto.MonthlyExpense;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

import static org.springframework.data.jpa.domain.AbstractPersistable_.id;

@RestController
@RequestMapping
@Tag(
        name = "Transactions",
        description = "APIs for managing income and expense transactions"
)
public class TransactionController {
    private final TransactionService transactionService;
    public TransactionController(TransactionService transactionService){
        this.transactionService = transactionService;
    }
    @Operation(
            summary = "Create a transaction",
            description = "creates a new income or expense transaction "
    )
    @PostMapping("/transactions")
    public Transaction addTransaction( @Valid  @RequestBody Transaction transaction){
        return transactionService.addTransaction(transaction);
    }
    @Operation(
            summary = "Get all transactions",
            description = "Return all income or expense transactions"
    )
    @GetMapping("/transactions")
    public List<Transaction> getAllTransactions(){
        return transactionService.getAllTransactions();
    }
    @Operation(
            summary = "Get transaction by id",
            description = "Return a single transaction using its id"
    )
    @GetMapping("/transactions/{id}")
    public Transaction getTransactionById(@Parameter(
                description = "Id of the transaction",
                example = "12") @PathVariable Long id){
        return transactionService.getTransactionById(id);
    }
    @Operation(
            summary = "Delete a transaction",
            description = "delete a existing transaction using id"
    )
    @DeleteMapping("/transactions/{id}")
    public void deleteTransactionById(@PathVariable Long id){
        transactionService.deleteTransactionById(id);
    }
    @Operation(
            summary = "Update the transaction",
            description = "Update existing transaction using id"
    )
    @PutMapping("/transactions/{id}")
    public Transaction updateTransaction(@PathVariable Long id,
    @RequestBody Transaction transaction){
        return transactionService.updateTransaction(id,transaction);
    }
    @Operation(
            summary = "Get total expense",
            description = "Returns the total amount of expense in transaction "
    )
    @GetMapping("/analytics/expenses")
    public BigDecimal getTotalExpenses(){
        return transactionService.getTotalExpenses();
    }
    @Operation(
            summary = "Get total income",
            description = "Return the total amount of income in transaction"
    )
    @GetMapping("/analytics/income")
    public BigDecimal getTotalIncome(){
        return transactionService.getTotalIncome();
    }
    @Operation(
            summary = "Get Balance",
            description = "Return the balance calculated as total income minus total expense"
    )
    @GetMapping("/analytics/balance")
    public BigDecimal getBalance(){
        return transactionService.getBalance();
    }
    @Operation(
            summary = "Get Category-wise expenses",
            description = "Return total expenses grouped by category"
    )
    @GetMapping("/analytics/category")
    public List<CategoryExpense> getCategoryWiseExpenses() {
        return transactionService.getCategoryWiseExpenses();
    }
    @Operation(
            summary = "Get Monthly-expenses",
            description = "Return total expenses grouped by month and year"
    )
    @GetMapping("/analytics/monthly")
    public List<MonthlyExpense> getMonthlyExpenses(){
        return transactionService.getMonthlyExpenses();
    }
    @GetMapping("/transactions/filter")
    @Operation(
            summary = "Filtered transactions",
            description = "Returns transactions filtered by type and category"
    )
    public List<Transaction> filterTransactions(
            @RequestParam(required = false)String type,
            @RequestParam(required = false) String category
    ){
        return transactionService.getTransactionsByFilters(type,category);
    }
}

