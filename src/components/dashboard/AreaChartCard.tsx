import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { EXPENSE_COLOR, INCOME_COLOR } from '../../constants/chart'
import { formatCurrency } from '../../utils/format'
import { getTooltipStyle } from '../../utils/chartStyle'

interface AreaChartCardProps {
  data: { month: string; income: number; expense: number }[]
}

export function AreaChartCard({ data }: AreaChartCardProps) {
  return (
    <div className="bg-[var(--card)] border border-[var(--border)] rounded-[var(--radius)] p-5">
      <h2 className="text-base font-600 mb-5 text-[var(--card-foreground)] font-display">
        Доходы и расходы по месяцам
      </h2>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
          <defs>
            <linearGradient id="gIncome" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={INCOME_COLOR} stopOpacity={0.25} />
              <stop offset="95%" stopColor={INCOME_COLOR} stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gExpense" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={EXPENSE_COLOR} stopOpacity={0.25} />
              <stop offset="95%" stopColor={EXPENSE_COLOR} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--muted-foreground)', fontFamily: 'Inter' }} axisLine={false} tickLine={false} />
          <YAxis
            tick={{ fontSize: 11, fill: 'var(--muted-foreground)', fontFamily: 'JetBrains Mono' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${(v / 1000).toFixed(0)}к`}
          />
          <Tooltip contentStyle={getTooltipStyle()} formatter={(value) => [formatCurrency(Number(value))]} />
          <Area type="monotone" dataKey="income" name="Доходы" stroke={INCOME_COLOR} strokeWidth={2} fill="url(#gIncome)" dot={false} />
          <Area type="monotone" dataKey="expense" name="Расходы" stroke={EXPENSE_COLOR} strokeWidth={2} fill="url(#gExpense)" dot={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
