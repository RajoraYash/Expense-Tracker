function SummaryCards({ balance, income, expenses }) {
  return (
    <section className="summary-grid">
      <div className="summary-card">
        <h3>Balance</h3>
        <p>₹{balance}</p>
      </div>

      <div className="summary-card">
        <h3>Income</h3>
        <p>₹{income}</p>
      </div>

      <div className="summary-card">
        <h3>Expenses</h3>
        <p>₹{expenses}</p>
      </div>
    </section>
  )
}

export default SummaryCards