import { useEffect, useState } from 'react'

function TransactionList({
  transactions,
  onTransactionDeleted,
  onEdit,
  page,
  totalPages,
  onPageChange
}) {
  const [type, setType] = useState('')
  const [category, setCategory] = useState('')
  const [filteredTransactions, setFilteredTransactions] =
    useState(transactions)

  const [isFiltering, setIsFiltering] = useState(false)

  useEffect(() => {
    if (!type && !category) {
      setFilteredTransactions(transactions)
      setIsFiltering(false)
      return
    }

    const fetchFilteredTransactions = async () => {
      try {
        setIsFiltering(true)

        let url = 'http://localhost:8080/transactions/filter'

        const params = new URLSearchParams()

        if (type) {
          params.append('type', type)
        }

        if (category) {
          params.append('category', category)
        }

        url += `?${params.toString()}`

        const response = await fetch(url)
        const data = await response.json()

        setFilteredTransactions(data)
      } catch (error) {
        console.error('Filter error:', error)
      }
    }

    fetchFilteredTransactions()
  }, [type, category, transactions])

  const handleDelete = (id) => {
    fetch(`http://localhost:8080/transactions/${id}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to delete transaction')
        }

        onTransactionDeleted()
      })
      .catch(error => {
        console.error(error)
      })
  }

  const handlePrevious = () => {
    if (page > 0) {
      onPageChange(page - 1)
    }
  }

  const handleNext = () => {
    if (page < totalPages - 1) {
      onPageChange(page + 1)
    }
  }

  return (
    <section className="transactions-section">
      <h2>Transactions</h2>

      {/* Filters */}

      <div className="filters">
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">All Types</option>
          <option value="EXPENSE">Expense</option>
          <option value="INCOME">Income</option>
        </select>

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>

      {/* Table */}

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredTransactions.map(transaction => (
            <tr key={transaction.id}>
              <td>{transaction.transactionDate}</td>

              <td>{transaction.category}</td>

              <td>{transaction.type}</td>

              <td>₹{transaction.amount}</td>

              <td>{transaction.description}</td>

              <td>
                <button
                  onClick={() => onEdit(transaction)}
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(transaction.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredTransactions.length === 0 && (
        <p>No transactions found.</p>
      )}

      {/* Pagination */}

      {!isFiltering && totalPages > 0 && (
        <div className="pagination">
          <button
            onClick={handlePrevious}
            disabled={page === 0}
          >
            Previous
          </button>

          <span>
            Page {page + 1} of {totalPages}
          </span>

          <button
            onClick={handleNext}
            disabled={page === totalPages - 1}
          >
            Next
          </button>
        </div>
      )}
    </section>
  )
}

export default TransactionList