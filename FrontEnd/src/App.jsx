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
  const [chartRefresh, setChartRefresh] = useState(0)

  const [editingTransaction, setEditingTransaction] = useState(null)

  const fetchTransactions = () => {
    fetch(
      `https://expense-tracker-production-accb.up.railway.app/transactions/page?page=${page}&size=10`
    )
      .then(response => response.json())
      .then(data => {
        setTransactions(data.content)
        setTotalPages(data.totalPages)
      })
      .catch(error => {
        console.error('Transaction fetch error:', error)
      })
  }

  const fetchSummary = () => {
    fetch('https://expense-tracker-production-accb.up.railway.app/analytics/balance')
      .then(response => response.json())
      .then(data => setBalance(data))

    fetch('https://expense-tracker-production-accb.up.railway.app/analytics/income')
      .then(response => response.json())
      .then(data => setIncome(data))

    fetch('https://expense-tracker-production-accb.up.railway.app/analytics/expenses')
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

     <DashboardCharts refreshKey={chartRefresh} />

      <AddTransaction
        editingTransaction={editingTransaction}
       onTransactionAdded={() => {
  fetchTransactions()
  fetchSummary()
  setChartRefresh(prev => prev + 1)
  setEditingTransaction(null)
}}
      />

      <TransactionList
        transactions={transactions}
        onTransactionDeleted={() => {
  fetchTransactions()
  fetchSummary()
  setChartRefresh(prev => prev + 1)
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