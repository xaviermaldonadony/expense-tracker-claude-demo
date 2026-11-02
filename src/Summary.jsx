import { formatMoney } from './format';

function Summary({ transactions }) {
  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  // Share of all money that moved (income + expenses) that went out as spending.
  const flow = totalIncome + totalExpenses;
  const spentShare = flow === 0 ? 0 : (totalExpenses / flow) * 100;
  const incomeShare = flow === 0 ? 0 : (totalIncome / flow) * 100;

  return (
    <section className="balance-hero">
      <p className="balance-label">Balance</p>
      <p className="balance-value">{formatMoney(balance)}</p>

      <div
        className="split"
        role="img"
        aria-label={`Spent ${Math.round(spentShare)}% of total income and expenses`}
      >
        <span className="split-income" style={{ width: `${incomeShare}%` }} />
        <span className="split-spent" style={{ width: `${spentShare}%` }} />
      </div>

      <dl className="breakdown">
        <div>
          <dt>Income</dt>
          <dd className="income-amount">{formatMoney(totalIncome)}</dd>
        </div>
        <div>
          <dt>Spent</dt>
          <dd className="expense-amount">{formatMoney(totalExpenses)}</dd>
        </div>
      </dl>
    </section>
  );
}

export default Summary;
