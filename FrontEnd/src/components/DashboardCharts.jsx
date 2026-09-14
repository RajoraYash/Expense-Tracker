import { useEffect, useState } from 'react'
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts'

function DashboardCharts() {
  const [categoryData, setCategoryData] = useState([])
  const [monthlyData, setMonthlyData] = useState([])

  useEffect(() => {
    fetch('http://localhost:8080/analytics/category')
      .then(response => response.json())
      .then(data => setCategoryData(data))

    fetch('http://localhost:8080/analytics/monthly')
      .then(response => response.json())
      .then(data => setMonthlyData(data))
  }, [])

  const formattedMonthlyData = monthlyData.map(item => ({
    month: `${item.year}-${String(item.month).padStart(2, '0')}`,
    amount: item.totalAmount
  }))

  return (
    <section className="charts-section">
      <h2>Expense Analytics</h2>

      <div className="chart-card">
        <h3>Category-wise Expenses</h3>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categoryData}
              dataKey="totalAmount"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} />
              ))}
            </Pie>

            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-card">
        <h3>Monthly Expenses</h3>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={formattedMonthlyData}>
            <CartesianGrid />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />

            <Bar
              dataKey="amount"
              name="Expenses"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}

export default DashboardCharts