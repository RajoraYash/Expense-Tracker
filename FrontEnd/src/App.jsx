import { useEffect, useState } from 'react'
import Header from './components/Header'
import SummaryCards from './components/SummaryCards'
import AddTransaction from './components/AddTransaction'
import TransactionList from './components/TransactionList'
import DashboardCharts from './components/DashboardCharts'

function App() {
  const [transactions, setTransactions] = useState([])
  const [page, setPage] = useState(0)
const [totalPages, setTotalPages] = useState(0)
  const [balance, setBalance] = useState(0)
const [income, setIncome] = useState(0)
const [expenses, setExpenses] = useState(0)
const [editingTransaction, setEditingTransaction] = useState(null)

 const fetchTransactions = () => {
  fetch(`http://localhost:8080/transactions/page?page=${page}&size=10`)
    .then(response => response.json())
    .then(data => {
      setTransactions(data.content)
      setTotalPages(data.totalPages)
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
}, [page])

  return (
    <div>
      <Header />
      <SummaryCards
  balance={balance}
  income={income}
  expenses={expenses}
/>
<DashboardCharts />

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
  setEditingTransaction(null)
}}
  onEdit={setEditingTransaction}
  page={page}
totalPages={totalPages}
onPageChange={setPage}
/>
    </div>
  )
}

export default App