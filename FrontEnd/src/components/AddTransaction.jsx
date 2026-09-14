import { useEffect, useState } from 'react'

function AddTransaction({
  editingTransaction,
  onTransactionAdded
}) {
  const [message, setMessage] = useState('')
const [error, setError] = useState('')
const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    type: 'EXPENSE',
    transactionDate: '',
    description: ''
  })

  useEffect(() => {
    if (editingTransaction) {
      setFormData({
        amount: editingTransaction.amount,
        category: editingTransaction.category,
        type: editingTransaction.type,
        transactionDate: editingTransaction.transactionDate,
        description: editingTransaction.description || ''
      })
    }
  }, [editingTransaction])

 const handleSubmit = (e) => {
  e.preventDefault()

  setLoading(true)
  setMessage('')
  setError('')

  const url = editingTransaction
    ? `http://localhost:8080/transactions/${editingTransaction.id}`
    : 'http://localhost:8080/transactions'

  const method = editingTransaction ? 'PUT' : 'POST'

  fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
    .then(async response => {
      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          Object.values(data).join(', ') || 'Something went wrong'
        )
      }

      return data
    })
    .then(data => {
      console.log('Success:', data)

      setMessage(
        editingTransaction
          ? 'Transaction updated successfully!'
          : 'Transaction added successfully!'
      )

      setFormData({
        amount: '',
        category: '',
        type: 'EXPENSE',
        transactionDate: '',
        description: ''
      })

      onTransactionAdded()
    })
    .catch(error => {
      console.error(error)
      setError(error.message)
    })
    .finally(() => {
      setLoading(false)
    })
}

  return (
    <section className="form-section">
      <h2>
        {editingTransaction ? 'Edit Transaction' : 'Add Transaction'}
      </h2>
{message && (
  <div>
    <p>{message}</p>

    <button onClick={() => window.location.reload()}>
      OK
    </button>
  </div>
)}

{error && <p>{error}</p>}
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

       <button type="submit" disabled={loading}>
  {loading
    ? 'Saving...'
    : editingTransaction
      ? 'Update Transaction'
      : 'Add Transaction'}
</button>

      </form>
    </section>
  )
}

export default AddTransaction