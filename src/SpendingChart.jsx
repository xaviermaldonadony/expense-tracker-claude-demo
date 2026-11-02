import { Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { capitalize, formatMoney, formatWholeMoney } from './format';

const AXIS_STYLE = { fill: '#5d626b', fontSize: 12 };

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
      <h2>Spending by category</h2>
      {data.length === 0 ? (
        <p className="chart-empty">No expenses yet.</p>
      ) : (
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={data} margin={{ top: 24, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="#e3e5e9" />
            <XAxis
              dataKey="category"
              tickFormatter={capitalize}
              tick={AXIS_STYLE}
              tickLine={false}
              axisLine={{ stroke: '#e3e5e9' }}
            />
            <YAxis
              tickFormatter={formatWholeMoney}
              tick={AXIS_STYLE}
              tickLine={false}
              axisLine={false}
              width={64}
            />
            <Tooltip formatter={formatMoney} cursor={{ fill: '#f4f5f7' }} />
            <Bar dataKey="amount" name="Spent" fill="#2a78d6" radius={[6, 6, 0, 0]} maxBarSize={56}>
              <LabelList dataKey="amount" position="top" formatter={formatWholeMoney} fill="#16181c" fontSize={12} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default SpendingChart;
