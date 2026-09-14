import { useEffect, useState } from 'react'

function TransactionList({
  transactions,
  onTransactionDeleted,
  onEdit
}) {
  const [type, setType] = useState('')
  const [category, setCategory] = useState('')
  const [filteredTransactions, setFilteredTransactions] = useState(transactions)

  useEffect(() => {
    const fetchFilteredTransactions = async () => {
      try {
        let url = 'http://localhost:8080/transactions/filter'

        const params = new URLSearchParams()

        if (type) {
          params.append('type', type)
        }

        if (category) {
          params.append('category', category)
        }

        if (params.toString()) {
          url += `?${params.toString()}`
        }

        const response = await fetch(url)
        const data = await response.json()

        setFilteredTransactions(data)
      } catch (error) {
        console.error('Filter error:', error)
      }
    }

    fetchFilteredTransactions()
  }, [type, category])

  useEffect(() => {
    if (!type && !category) {
      setFilteredTransactions(transactions)
    }
  }, [transactions, type, category])

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

  return (
    <section className="transactions-section">
      <h2>Transactions</h2>

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
                <button onClick={() => onEdit(transaction)}>
                  Edit
                </button>

                <button onClick={() => handleDelete(transaction.id)}>
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
    </section>
  )
}

export default TransactionList