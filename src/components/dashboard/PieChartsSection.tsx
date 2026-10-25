import { useGetByCategoryQuery } from '../../store/api/statsApi'
import type { Period } from '../../types/period'
import { PieSection } from './PieSection'

interface PieChartsSectionProps {
  period: Period
}

export function PieChartsSection({period}: PieChartsSectionProps) {
  const { data: expenseByName = [] } = useGetByCategoryQuery({type: "expense", period})
  const { data: incomeByName = [] } = useGetByCategoryQuery({type: "income", period})


  return (
    <div className="grid grid-cols-2 gap-4 max-[900px]:grid-cols-1">
      <PieSection title="Структура расходов" data={expenseByName} />
      <PieSection title="Структура доходов" data={incomeByName} />
    </div>
  )
}
