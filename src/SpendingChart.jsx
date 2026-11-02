import { Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { formatMoney, formatWholeMoney } from './format';

const INK = '#16202a';
const SLATE = '#5b6670';
const RULE = '#d9ddd8';
const ACCENT = '#1f5c4a';

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
    <section className="spending-chart">
      <h2>Spending by category</h2>
      {data.length === 0 ? (
        <p className="chart-empty">No expenses yet.</p>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data} margin={{ top: 20, right: 10, left: 10, bottom: 5 }}>
            <CartesianGrid vertical={false} stroke={RULE} />
            <XAxis dataKey="category" stroke={RULE} tick={{ fill: SLATE, fontSize: 12 }} tickLine={false} />
            <YAxis tickFormatter={formatWholeMoney}stroke={RULE} tick={{ fill: SLATE, fontSize: 12 }} tickLine={false} width={64} />
            <Tooltip formatter={formatMoney} cursor={{ fill: '#e8ebe6' }} />
            <Bar dataKey="amount" name="Spent" fill={ACCENT} radius={[2, 2, 0, 0]}>
              <LabelList dataKey="amount" position="top" formatter={formatWholeMoney} fill={INK} fontSize={12} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </section>
  );
}

export default SpendingChart;
