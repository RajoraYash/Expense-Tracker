package com.yash.expensetracker.Repository;

import com.yash.expensetracker.Transaction.Transaction;
import com.yash.expensetracker.dto.CategoryExpense;
import com.yash.expensetracker.dto.MonthlyExpense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;
import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction , Long> {
    @Query("SELECT SUM(t.amount) FROM Transaction t WHERE t.type = 'EXPENSE'")
    BigDecimal getTotalExpenses();

    @Query("SELECT SUM(t.amount) FROM Transaction t WHERE t.type = 'INCOME'")
    BigDecimal getTotalIncome();

    @Query("""

            SELECT new com.yash.expensetracker.dto.CategoryExpense(t.category,SUM(t.amount)) FROM Transaction t 
WHERE t.type = 'EXPENSE' GROUP BY t.category """)
    List<CategoryExpense> getCategoryWiseExpenses();

@Query("""
            
SELECT new com.yash.expensetracker.dto.MonthlyExpense(
YEAR(t.transactionDate),MONTH(t.transactionDate),
SUM(t.amount)
)
FROM Transaction t WHERE t.type = 'EXPENSE'
GROUP BY YEAR(t.transactionDate), MONTH(t.transactionDate)
ORDER BY YEAR(t.transactionDate), MONTH(t.transactionDate)
""")
List<MonthlyExpense> getMonthlyExpenses();
}