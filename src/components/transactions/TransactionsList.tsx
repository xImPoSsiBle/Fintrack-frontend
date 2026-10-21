import { useGetTransactionsQuery } from '../../store/api/transactionsApi'
import EmptyState from '../ui/EmptyState'
import { TransactionRow } from './TransactionRow'

export function TransactionsList() {
  const { data: transactions = [], isLoading, isError } = useGetTransactionsQuery()

  if (isLoading) {
    return <div className="text-center py-4">Загрузка данных...</div>
  }

  if (isError || !transactions) {
    return <div className="text-center py-4">Не удалось загрузить данные</div>
  }

  return (
    <div className="bg-[var(--card)] border border-[var(--border)] rounded-[var(--radius)] overflow-hidden">
      <div className="px-5 py-4 border-b border-[var(--border)] flex items-center justify-between">
        <h2 className="text-base font-600 text-[var(--card-foreground)] font-display">История транзакций</h2>
        <span className="text-xs text-[var(--muted-foreground)] font-mono">{transactions.length} записей</span>
      </div>

      <div className="grid px-5 py-2.5 bg-[var(--muted)] text-xs font-500 text-[var(--muted-foreground)] uppercase tracking-wider grid-cols-[120px_1fr_140px_40px]">
        <span>Категория</span>
        <span>Название</span>
        <span className="text-right">Сумма</span>
        <span></span>
      </div>

      <div className="divide-y divide-[var(--border)]">
        {transactions.length === 0 && (
          <EmptyState message='Нет транзакций. Добавьте первую запись выше.' />
        )}
        {transactions.map((t) => (
          <TransactionRow key={t.transaction.id} transaction={t} />
        ))}
      </div>
    </div>
  )
}
