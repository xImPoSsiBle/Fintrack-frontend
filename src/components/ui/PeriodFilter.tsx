import type { Period } from '../../types/period'

const PERIOD_OPTIONS: { value: Period; label: string }[] = [
    { value: 'today', label: 'Сегодня' },
    { value: 'week', label: 'Неделя' },
    { value: 'month', label: 'Месяц' },
    { value: 'all', label: 'Всё время' },
]

interface PeriodFilterProps {
    value: Period
    onChange: (period: Period) => void
}

export function PeriodFilter({ value, onChange }: PeriodFilterProps) {
    return (
        <div className="flex rounded-lg border border-[var(--border)] overflow-hidden h-11">
            {PERIOD_OPTIONS.map((p) => (
                <button
                    key={p.value}
                    onClick={() => onChange(p.value)}
                    className={`flex-1 px-4 text-sm font-500 transition-colors cursor-pointer whitespace-nowrap ${value === p.value
                        ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                        : 'bg-transparent text-[var(--muted-foreground)] hover:bg-[var(--muted)]'
                        }`}
                >
                    {p.label}
                </button>
            ))}
        </div>
    )
}