import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { PIE_PALETTE } from '../../constants/chart'
import { formatCurrency } from '../../utils/format'
import { getTooltipStyle } from '../../utils/chartStyle'

interface PieSectionProps {
  title: string
  data: { name: string; value: number }[]
}

export function PieSection({ title, data }: PieSectionProps) {
  if (data.length === 0) {
    return (
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-[var(--radius)] p-5 flex items-center justify-center min-h-[220px]">
        <p className="text-sm text-[var(--muted-foreground)]">Нет данных</p>
      </div>
    )
  }

  const total = data.reduce((s, d) => s + d.value, 0)

  return (
    <div className="bg-[var(--card)] border border-[var(--border)] rounded-[var(--radius)] p-5">
      <h2 className="text-base font-600 mb-4 text-[var(--card-foreground)] font-display">{title}</h2>
      <div className="flex gap-4 items-center max-[500px]:flex-col">
        <ResponsiveContainer width={160} height={160}>
          <PieChart>
            <Pie data={data} dataKey="value" cx="50%" cy="50%" innerRadius={40} outerRadius={70} paddingAngle={3} strokeWidth={0}>
              {data.map((_, i) => (
                <Cell key={i} fill={PIE_PALETTE[i % PIE_PALETTE.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={getTooltipStyle()} formatter={(value) => [formatCurrency(Number(value))]} />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex-1 space-y-2 min-w-0">
          {data.map((d, i) => (
            <div key={d.name} className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: PIE_PALETTE[i % PIE_PALETTE.length] }} />
                <span className="text-xs text-[var(--card-foreground)] truncate">{d.name}</span>
              </div>
              <span className="text-xs text-[var(--muted-foreground)] font-mono">
                {Math.round((d.value / total) * 100)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
