import { Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const formatDollars = (value) => `$${value}`;

function SpendingChart({ transactions }) {
  const totalsByCategory = {};
  for (const t of transactions) {
    if (t.type === 'expense') {
      totalsByCategory[t.category] = (totalsByCategory[t.category] ?? 0) + t.amount;
    }
  }

  const data = Object.entries(totalsByCategory)
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount);

  return (
    <div className="spending-chart">
      <h2>Spending by Category</h2>
      {data.length === 0 ? (
        <p className="chart-empty">No expenses yet.</p>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data} margin={{ top: 20, right: 10, left: 10, bottom: 5 }}>
            <CartesianGrid vertical={false} stroke="#ddd" />
            <XAxis dataKey="category" stroke="#888" />
            <YAxis tickFormatter={formatDollars} stroke="#888" width={60} />
            <Tooltip formatter={formatDollars} cursor={{ fill: '#f5f5f5' }} />
            <Bar dataKey="amount" name="Spent" fill="#2a78d6" radius={[4, 4, 0, 0]}>
              <LabelList dataKey="amount" position="top" formatter={formatDollars} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default SpendingChart;
