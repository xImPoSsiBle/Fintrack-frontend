import { useState } from 'react'
import { useGetTransactionsQuery } from '../../store/api/transactionsApi'
import EmptyState from '../ui/EmptyState'
import { TransactionRow } from './TransactionRow'
import { useDebounce } from '../../hooks/useDebounce'
import type { Period } from '../../types/period'

interface TransactionsListProps {
  period: Period
}

export function TransactionsList({period}: TransactionsListProps) {
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search.trim())

  const { data: transactions = [], isLoading, isError } = useGetTransactionsQuery({
    search: debouncedSearch,
    period,
  })

  return (
    <div className="bg-[var(--card)] border border-[var(--border)] rounded-[var(--radius)] overflow-hidden">
      <div className="px-5 py-4 border-b border-[var(--border)] flex items-center justify-between">
        <h2 className="text-base font-600 text-[var(--card-foreground)] font-display">История транзакций</h2>
        <span className="text-xs text-[var(--muted-foreground)] font-mono">{transactions.length} записей</span>
      </div>

      <div className="px-5 py-3 border-b border-[var(--border)] flex gap-3 max-[700px]:flex-col">
        <input
          type="text"
          placeholder="Поиск по категории или описанию"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 h-11 px-3 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm placeholder:text-[var(--muted-foreground)]"
        />
      </div>

      <div className="grid px-5 py-2.5 bg-[var(--muted)] text-xs font-500 text-[var(--muted-foreground)] uppercase tracking-wider grid-cols-[120px_1fr_140px_40px]">
        <span>Категория</span>
        <span>Название</span>
        <span className="text-right">Сумма</span>
        <span></span>
      </div>

      <div className="divide-y divide-[var(--border)]">
        {isLoading && <div className="text-center py-4">Загрузка данных...</div>}
        {isError && <div className="text-center py-4">Не удалось загрузить данные</div>}
        {!isLoading && !isError && transactions.length === 0 && (
          <EmptyState message="Ничего не найдено." />
        )}
        {transactions.map((t) => (
          <TransactionRow key={t.transaction.id} transaction={t} />
        ))}
      </div>
    </div>
  )
}
