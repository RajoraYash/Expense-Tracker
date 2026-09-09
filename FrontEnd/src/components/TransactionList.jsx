function TransactionList({ transactions }) {
  return (
    <section>
      <h2>Transactions</h2>

      <div>
        {transactions.map(transaction => (
          <p key={transaction.id}>
            {transaction.category} | {transaction.type} | ₹{transaction.amount}
          </p>
        ))}
      </div>
    </section>
  )
}

export default TransactionList