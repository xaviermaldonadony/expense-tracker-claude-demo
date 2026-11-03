import { formatMoney } from './format';
import { sumByType } from './transactions';

function Summary({ transactions }) {
  const totalIncome = sumByType(transactions, 'income');
  const totalExpenses = sumByType(transactions, 'expense');

  // Round to cents so float residue (e.g. 0.3 - 0.1 - 0.2) doesn't show as -$0.00.
  // `|| 0` turns a negative zero into a plain zero.
  const balance = Math.round((totalIncome - totalExpenses) * 100) / 100 || 0;

  return (
    <section className="summary">
      <div>
        <p className="summary-label">Balance</p>
        <p className={balance < 0 ? 'balance-amount expense-amount' : 'balance-amount'}>
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
