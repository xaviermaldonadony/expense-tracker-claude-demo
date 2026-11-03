import { useState } from 'react';
import { CATEGORIES, MAX_AMOUNT } from './constants';
import { formatWholeMoney } from './format';

// Returns { description?, amount? } with a message for each invalid field.
// An empty object means the input is valid.
function validate({ description, amount }) {
  const errors = {};

  if (!description.trim()) {
    errors.description = 'Enter a description.';
  }

  const value = Number(amount);
  if (amount.trim() === '' || !Number.isFinite(value)) {
    errors.amount = 'Enter a valid amount.';
  } else if (value <= 0) {
    errors.amount = 'Amount must be greater than zero.';
  } else if (value > MAX_AMOUNT) {
    errors.amount = `Amount must be ${formatWholeMoney(MAX_AMOUNT)} or less.`;
  } else if (Math.abs(value * 100 - Math.round(value * 100)) > 1e-6) {
    // Tolerance absorbs float error, e.g. 0.1 * 100 !== 10 exactly in some cases.
    errors.amount = 'Use at most two decimal places.';
  }

  return errors;
}

function TransactionForm({ onAddTransaction }) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [category, setCategory] = useState('food');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const fieldErrors = validate({ description, amount });
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) return;

    const newTransaction = {
      id: Date.now(),
      description: description.trim(),
      amount: Number(amount),
      type,
      category,
      // Local calendar date as YYYY-MM-DD (en-CA formats this way).
      date: new Date().toLocaleDateString('en-CA'),
    };

    onAddTransaction(newTransaction);
    setDescription('');
    setAmount('');
    // Type and category are kept so several similar entries can be added in a row.
  };

  return (
    <div className="add-transaction">
      <h2>Add transaction</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="field field-description">
          <input
            type="text"
            placeholder="Description"
            aria-label="Description"
            aria-invalid={Boolean(errors.description)}
            aria-describedby={errors.description ? 'description-error' : undefined}
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              setErrors((prev) => ({ ...prev, description: undefined }));
            }}
          />
          {errors.description && (
            <p id="description-error" className="field-error" role="alert">{errors.description}</p>
          )}
        </div>
        <div className="field field-amount">
          <input
            type="number"
            placeholder="Amount"
            aria-label="Amount"
            aria-invalid={Boolean(errors.amount)}
            aria-describedby={errors.amount ? 'amount-error' : undefined}
            min="0.01"
            step="0.01"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
              setErrors((prev) => ({ ...prev, amount: undefined }));
            }}
          />
          {errors.amount && (
            <p id="amount-error" className="field-error" role="alert">{errors.amount}</p>
          )}
        </div>
        <select aria-label="Type" value={type} onChange={(e) => setType(e.target.value)}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select aria-label="Category" value={category} onChange={(e) => setCategory(e.target.value)}>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default TransactionForm;
