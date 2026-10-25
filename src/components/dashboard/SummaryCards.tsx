import { useGetSummaryQuery } from '../../store/api/statsApi';
import type { Period } from '../../types/period';
import { formatCurrency } from '../../utils/format'
import { SummaryCard } from './SummaryCard'

interface SummaryCardsProps {
  period: Period
}

export function SummaryCards({period}: SummaryCardsProps) {
  const { data: total, isLoading, isError } = useGetSummaryQuery(period)

  if (isLoading) {
    return <div className="text-center py-4">Загрузка данных...</div>
  }

  if (isError || !total) {
    return <div className="text-center py-4">Не удалось загрузить данные</div>
  }

  return (
    <div className="grid grid-cols-3 gap-4 max-[700px]:grid-cols-1">
      <SummaryCard label="Доходы" value={formatCurrency(total.income)} color="accent" icon="↑" />
      <SummaryCard label="Расходы" value={formatCurrency(total.expense)} color="danger" icon="↓" />
      <SummaryCard
        label="Баланс"
        value={formatCurrency(total.balance)}
        color={total.balance >= 0 ? 'accent' : 'danger'}
        icon="="
        highlight
      />
    </div>
  )
}
