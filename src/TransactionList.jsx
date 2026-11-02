import { useState } from 'react';
import { CATEGORIES } from './constants';
import { capitalize, formatMoney } from './format';

function TransactionList({ transactions }) {
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  let filteredTransactions = transactions;
  if (filterType !== "all") {
    filteredTransactions = filteredTransactions.filter(t => t.type === filterType);
  }
  if (filterCategory !== "all") {
    filteredTransactions = filteredTransactions.filter(t => t.category === filterCategory);
  }

  return (
    <div className="transactions">
      <h2>Transactions</h2>
      <div className="filters">
        <select aria-label="Filter by type" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="all">All types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select aria-label="Filter by category" value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
          <option value="all">All categories</option>
          {CATEGORIES.map(cat => (
            <option key={cat} value={cat}>{capitalize(cat)}</option>
          ))}
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th className="date-col">Date</th>
            <th>Description</th>
            <th>Category</th>
            <th className="amount-col">Amount</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.length === 0 ? (
            <tr>
              <td colSpan={4} className="table-empty">No transactions match these filters.</td>
            </tr>
          ) : (
            filteredTransactions.map(t => (
              <tr key={t.id}>
                <td className="date-cell">{t.date}</td>
                <td>{t.description}</td>
                <td className="category-cell">{t.category}</td>
                <td className={`amount-cell ${t.type === "income" ? "income-amount" : "expense-amount"}`}>
                  {t.type === "income" ? "+" : "-"}{formatMoney(t.amount)}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionList;
