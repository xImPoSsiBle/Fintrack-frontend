import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { EXPENSE_COLOR, INCOME_COLOR } from '../../constants/chart'
import { formatCurrency } from '../../utils/format'
import { getTooltipStyle } from '../../utils/chartStyle'
import EmptyState from '../ui/EmptyState'

interface BarChartCardProps {
  data: { month: string; income: number; expense: number }[]
}

export function BarChartCard({ data }: BarChartCardProps) {
  return (
    <div className="bg-[var(--card)] border border-[var(--border)] rounded-[var(--radius)] p-5">
      <h2 className="text-base font-600 mb-5 text-[var(--card-foreground)] font-display">Сравнение по периодам</h2>
      {data.length === 0 ? (
        <div className="h-[200px] flex items-center justify-center">
          <EmptyState message="Нет данных за выбранный период" />
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -20 }} barGap={4}>
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--muted-foreground)', fontFamily: 'Inter' }} axisLine={false} tickLine={false} />
            <YAxis
              tick={{ fontSize: 11, fill: 'var(--muted-foreground)', fontFamily: 'JetBrains Mono' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${(v / 1000).toFixed(0)}к`}
            />
            <Tooltip contentStyle={getTooltipStyle()} formatter={(value) => [formatCurrency(Number(value))]} />
            <Bar dataKey="income" name="Доходы" fill={INCOME_COLOR} radius={[4, 4, 0, 0]} />
            <Bar dataKey="expense" name="Расходы" fill={EXPENSE_COLOR} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}
