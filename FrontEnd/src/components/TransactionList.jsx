import { useEffect, useState } from 'react'

function TransactionList({
  transactions,
  onTransactionDeleted,
  onEdit
}) {
  const [type, setType] = useState('')
  const [category, setCategory] = useState('')

  useEffect(() => {
    console.log('Selected filters:', type, category)
  }, [type, category])

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
    <section>
      <h2>Transactions</h2>

      <div>
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
          {transactions.map(transaction => (
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
    </section>
  )
}

export default TransactionList