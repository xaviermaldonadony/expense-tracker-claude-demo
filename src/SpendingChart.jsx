import { Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { CHART_COLORS } from './constants';
import { formatMoney, formatWholeMoney } from './format';
import { sumByType } from './transactions';

const { ink: INK, slate: SLATE, rule: RULE, accent: ACCENT, hover: HOVER } = CHART_COLORS;

// Cents for amounts under $1 (so they don't read as $0), whole dollars otherwise.
const formatLabel = (value) => (Math.abs(value) < 1 ? formatMoney(value) : formatWholeMoney(value));

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

  const description = `Expenses by category: ${data
    .map((d) => `${d.category} ${formatMoney(d.amount)}`)
    .join(', ')}. Total ${formatMoney(sumByType(transactions, 'expense'))}.`;

  return (
    <section className="spending-chart">
      <h2>Spending by category</h2>
      {data.length === 0 ? (
        <p className="chart-empty">No expenses yet.</p>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 10, left: 10, bottom: 5 }}
            desc={description}
          >
            <CartesianGrid vertical={false} stroke={RULE} />
            <XAxis dataKey="category" stroke={RULE} tick={{ fill: SLATE, fontSize: 12 }} tickLine={false} />
            <YAxis tickFormatter={formatWholeMoney} stroke={RULE} tick={{ fill: SLATE, fontSize: 12 }} tickLine={false} width={64} />
            <Tooltip formatter={formatMoney} cursor={{ fill: HOVER }} />
            <Bar dataKey="amount" name="Spent" fill={ACCENT} radius={[2, 2, 0, 0]}>
              <LabelList dataKey="amount" position="top" formatter={formatLabel} fill={INK} fontSize={12} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </section>
  );
}

export default SpendingChart;
