// Sum of all transaction amounts of one type ('income' or 'expense').
export const sumByType = (transactions, type) =>
  transactions
    .filter((t) => t.type === type)
    .reduce((sum, t) => sum + t.amount, 0);
