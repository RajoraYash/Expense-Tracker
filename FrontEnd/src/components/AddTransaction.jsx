import { useState } from 'react'

function AddTransaction({ onTransactionAdded }) {
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    type: 'EXPENSE',
    transactionDate: '',
    description: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()

fetch('http://localhost:8080/transactions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
  .then(response => response.json())
    .then(data => {
      console.log('Transaction added:', data)
      setFormData({
    amount: '',
    category: '',
    type: 'EXPENSE',
    transactionDate: '',
    description: ''
  })
  onTransactionAdded()
    })
  }

  return (
    <section>
      <h2>Add Transaction</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="number"
          placeholder="Amount"
          value={formData.amount}
          onChange={(e) =>
            setFormData({
              ...formData,
              amount: e.target.value
            })
          }
        />

        <input
          type="text"
          placeholder="Category"
          value={formData.category}
          onChange={(e) =>
            setFormData({
              ...formData,
              category: e.target.value
            })
          }
        />

        <select
          value={formData.type}
          onChange={(e) =>
            setFormData({
              ...formData,
              type: e.target.value
            })
          }
        >
          <option value="EXPENSE">Expense</option>
          <option value="INCOME">Income</option>
        </select>

        <input
          type="date"
          value={formData.transactionDate}
          onChange={(e) =>
            setFormData({
              ...formData,
              transactionDate: e.target.value
            })
          }
        />

        <input
          type="text"
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({
              ...formData,
              description: e.target.value
            })
          }
        />

        <button type="submit">Add Transaction</button>

      </form>
    </section>
  )
}

export default AddTransaction