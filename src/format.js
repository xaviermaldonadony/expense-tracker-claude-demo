const usd = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
const wholeUsd = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

// Full precision, e.g. $1,200.50. Used for totals and transaction amounts.
export const formatMoney = (value) => usd.format(value);

// Whole dollars, e.g. $1,200. Used where precision would only add clutter (chart axis and labels).
export const formatWholeMoney = (value) => wholeUsd.format(value);

// Display label for a category key, e.g. "food" -> "Food".
export const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);
