import { useGetByCategoryQuery } from '../../store/api/statsApi'
import { PieSection } from './PieSection'

export function PieChartsSection() {
  const { data: expenseByName = [] } = useGetByCategoryQuery("expense")
  const { data: incomeByName = [] } = useGetByCategoryQuery("income")


  return (
    <div className="grid grid-cols-2 gap-4 max-[900px]:grid-cols-1">
      <PieSection title="Структура расходов" data={expenseByName} />
      <PieSection title="Структура доходов" data={incomeByName} />
    </div>
  )
}
