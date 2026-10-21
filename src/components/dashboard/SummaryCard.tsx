interface SummaryCardProps {
  label: string
  value: string
  color?: 'accent' | 'danger'
  icon?: string
  highlight?: boolean
}

export function SummaryCard({ label, value, color, icon, highlight }: SummaryCardProps) {
  const isAccent = color === 'accent'

  return (
    <div
      className={`rounded-[var(--radius)] p-5 border transition-colors ${highlight
        ? isAccent
          ? 'bg-[var(--accent)]/8 border-[var(--accent)]/20'
          : 'bg-[var(--danger)]/8 border-[var(--danger)]/20'
        : 'bg-[var(--card)] border-[var(--border)]'
        }`}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-500 text-[var(--muted-foreground)] uppercase tracking-wider">{label}</span>
        {icon &&
          <span
            className={`w-7 h-7 rounded-lg flex items-center justify-center text-sm font-600 ${isAccent ? 'bg-[var(--accent)]/15 text-[var(--accent)]' : 'bg-[var(--danger)]/15 text-[var(--danger)]'
              }`}
          >
            {icon}
          </span>
        }
      </div>
      <div
        className={`text-2xl font-600 tracking-tight font-display 
          ${color === 'accent'
            ? 'text-[var(--accent)]'
            : color === 'danger'
              ? 'text-[var(--danger)]'
              : 'text-[var(--foreground)]'
          }`}
      >
        {value}
      </div>
    </div>
  )
}
