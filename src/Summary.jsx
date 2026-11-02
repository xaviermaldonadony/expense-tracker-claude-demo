import { formatMoney } from './format';

function Summary({ transactions }) {
  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  return (
    <section className="summary">
      <div>
        <p className="summary-label">Balance</p>
        <p className={balance < 0 ? "balance-amount expense-amount" : "balance-amount"}>
          {formatMoney(balance)}
        </p>
      </div>
      <dl className="totals">
        <div>
          <dt>Income</dt>
          <dd className="income-amount">{formatMoney(totalIncome)}</dd>
        </div>
        <div>
          <dt>Expenses</dt>
          <dd className="expense-amount">{formatMoney(totalExpenses)}</dd>
        </div>
      </dl>
    </section>
  );
}

export default Summary;
