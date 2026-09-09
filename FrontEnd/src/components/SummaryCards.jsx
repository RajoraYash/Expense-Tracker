function SummaryCards({ balance, income, expenses }) {
  return (
    <section>
      <div>
        <h3>Balance</h3>
        <p>₹{balance}</p>
      </div>

      <div>
        <h3>Income</h3>
        <p>₹{income}</p>
      </div>

      <div>
        <h3>Expenses</h3>
        <p>₹{expenses}</p>
      </div>
    </section>
  )
}

export default SummaryCards