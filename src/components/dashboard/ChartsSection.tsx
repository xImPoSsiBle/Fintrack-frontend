import { useGetMonthlyQuery } from '../../store/api/statsApi';
import { AreaChartCard } from './AreaChartCard'
import { BarChartCard } from './BarChartCard'
import { formatMonth } from '../../utils/format';
import type { Period } from '../../types/period';

interface ChartsSectionProps {
  period: Period
}

export function ChartsSection({period}: ChartsSectionProps) {
  const { data, isLoading, isError } = useGetMonthlyQuery(period)

  if (isLoading) {
    return <div className="text-center py-4">Загрузка данных...</div>
  }

  if (isError || !data) {
    return <div className="text-center py-4">Не удалось загрузить данные</div>
  }

  const monthlyData = data.map(i => ({ ...i, month: formatMonth(i.month) }))

  return (
    <div className="grid grid-cols-2 gap-4 max-[900px]:grid-cols-1">
      <AreaChartCard data={monthlyData} />
      <BarChartCard data={monthlyData} />
    </div>
  )
}
