package com.yash.expensetracker.Service;

import com.yash.expensetracker.Repository.TransactionRepository;
import com.yash.expensetracker.Transaction.Transaction;
import com.yash.expensetracker.dto.CategoryExpense;
import com.yash.expensetracker.dto.MonthlyExpense;
import com.yash.expensetracker.exception.TransactionNotFoundException;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class TransactionService {
    private final TransactionRepository transactionRepository;
    public TransactionService(TransactionRepository transactionRepository){
        this.transactionRepository = transactionRepository;
    }
    public Transaction addTransaction(Transaction transaction){
        return transactionRepository.save(transaction);
    }
    public List<Transaction> getAllTransactions(){
        return transactionRepository.findAll();
    }
    public Transaction getTransactionById(Long id){
        return transactionRepository.findById(id).orElseThrow(()->
                new TransactionNotFoundException("Transaction not found with id : " + id));
    }
    public void deleteTransactionById(Long id){
        if(!transactionRepository.existsById(id)){
            throw new TransactionNotFoundException("Transaction not found by id : " + id);

        }
        transactionRepository.deleteById(id);
    }
    public Transaction updateTransaction(Long id ,Transaction updatedTransaction){
        Transaction existingTransaction =
                transactionRepository.findById(id).orElseThrow(()->
                        new TransactionNotFoundException("Transaction not found with id : " + id));
        existingTransaction.setAmount(updatedTransaction.getAmount());
        existingTransaction.setCategory(updatedTransaction.getCategory());
        existingTransaction.setTransactionDate(updatedTransaction.getTransactionDate());
        existingTransaction.setType(updatedTransaction.getType());
        existingTransaction.setDescription(updatedTransaction.getDescription());

        return transactionRepository.save(existingTransaction);
    }
    public BigDecimal getTotalExpenses(){
        return transactionRepository.getTotalExpenses();
    }
    public BigDecimal getTotalIncome(){
        return transactionRepository.getTotalIncome();
    }
    public BigDecimal getBalance(){
        BigDecimal income = getTotalIncome();
        BigDecimal expenses = getTotalExpenses();
        return income.subtract(expenses);
    }
    public List<CategoryExpense> getCategoryWiseExpenses(){
        return transactionRepository.getCategoryWiseExpenses();
    }
    public List<MonthlyExpense> getMonthlyExpenses(){
        return transactionRepository.getMonthlyExpenses();
    }
    public List<Transaction> getTransactionsByFilters(
            String type,
            String category){
        return transactionRepository.findByFilters(type,category);

    }
}
