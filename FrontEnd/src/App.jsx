import { useEffect, useState } from 'react'
import Header from './components/Header'
import SummaryCards from './components/SummaryCards'
import AddTransaction from './components/AddTransaction'
import TransactionList from './components/TransactionList'

function App() {
  const [transactions, setTransactions] = useState([])
  const [balance, setBalance] = useState(0)
const [income, setIncome] = useState(0)
const [expenses, setExpenses] = useState(0)
const [editingTransaction, setEditingTransaction] = useState(null)

  const fetchTransactions = () => {
    fetch('http://localhost:8080/transactions')
      .then(response => response.json())
      .then(data => {
        setTransactions(data)
      })
  }
  const fetchSummary = () => {
  fetch('http://localhost:8080/analytics/balance')
    .then(response => response.json())
    .then(data => setBalance(data))

  fetch('http://localhost:8080/analytics/income')
    .then(response => response.json())
    .then(data => setIncome(data))

  fetch('http://localhost:8080/analytics/expenses')
    .then(response => response.json())
    .then(data => setExpenses(data))
}

  useEffect(() => {
    fetchTransactions()
    fetchSummary()
  }, [])

  return (
    <div>
      <Header />
      <SummaryCards
  balance={balance}
  income={income}
  expenses={expenses}
/>

     <AddTransaction
  editingTransaction={editingTransaction}
  onTransactionAdded={() => {
    fetchTransactions()
    fetchSummary()
    setEditingTransaction(null)
  }}
/>

   <TransactionList
  transactions={transactions}
  onTransactionDeleted={() => {
    fetchTransactions()
    fetchSummary()
  }}
  onEdit={setEditingTransaction}
/>
    </div>
  )
}

export default App