package com.yash.expensetracker.Repository;

import com.yash.expensetracker.Transaction.Transaction;
import com.yash.expensetracker.dto.CategoryExpense;
import com.yash.expensetracker.dto.MonthlyExpense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

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
    @Query("""
    SELECT t FROM Transaction t
    WHERE (:type IS NULL OR t.type = :type)
    AND (:category IS NULL OR t.category = :category)
""")
    List<Transaction> findByFilters(
            @Param("type") String type,
            @Param("category") String category
    );
}