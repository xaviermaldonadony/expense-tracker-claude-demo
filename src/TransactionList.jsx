import { useState } from 'react';
import { CATEGORIES } from './constants';
import { formatMoney } from './format';

function TransactionList({ transactions }) {
  const [filterType, setFilterType] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');

  const filteredTransactions = transactions.filter(
    (t) =>
      (filterType === 'all' || t.type === filterType) &&
      (filterCategory === 'all' || t.category === filterCategory),
  );

  return (
    <div className="transactions">
      <h2>Transactions</h2>
      <div className="filters">
        <select aria-label="Filter by type" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select aria-label="Filter by category" value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
          <option value="all">All Categories</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Description</th>
            <th scope="col">Category</th>
            <th scope="col">Amount</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.length === 0 && (
            <tr>
              <td colSpan={4} className="table-empty">No transactions match these filters.</td>
            </tr>
          )}
          {filteredTransactions.map((t) => (
            <tr key={t.id}>
              <td>{t.date}</td>
              <td>{t.description}</td>
              <td>{t.category}</td>
              <td className={t.type === 'income' ? 'income-amount' : 'expense-amount'}>
                {t.type === 'income' ? '+' : '-'}{formatMoney(Math.abs(t.amount))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionList;
