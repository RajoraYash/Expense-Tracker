import { useEffect, useState } from 'react'

function AddTransaction({
  editingTransaction,
  onTransactionAdded
}) {
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

    const url = editingTransaction
      ? `http://localhost:8080/transactions/${editingTransaction.id}`
      : 'http://localhost:8080/transactions'

    const method = editingTransaction ? 'PUT' : 'POST'

    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(data => {
        console.log(
          editingTransaction
            ? 'Transaction updated:'
            : 'Transaction added:',
          data
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
      })
  }

  return (
    <section>
      <h2>
        {editingTransaction ? 'Edit Transaction' : 'Add Transaction'}
      </h2>

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

        <button type="submit">
          {editingTransaction ? 'Update Transaction' : 'Add Transaction'}
        </button>

      </form>
    </section>
  )
}

export default AddTransaction