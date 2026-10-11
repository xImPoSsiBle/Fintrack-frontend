import { useDeleteTransactionMutation } from '../../store/api/transactionsApi'
import type { Transaction } from '../../types/transaction'
import { formatCurrency } from '../../utils/format'
import { CloseIcon } from '../icons/Icons'

interface TransactionRowProps {
  transaction: Transaction
}

export function TransactionRow({ transaction: t }: TransactionRowProps) {
  const [deleteTransaction] = useDeleteTransactionMutation()
  const isIncome = t.transaction.type === 'income'

  return (
    <div
      className="grid px-5 py-3.5 items-center hover:bg-[var(--muted)]/40 transition-colors group grid-cols-[120px_1fr_140px_40px]"
    >
      <span>
        <span
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-500 ${
            isIncome ? 'bg-green-500/10 text-green-600 dark:text-green-400' : 'bg-red-500/10 text-red-500 dark:text-red-400'
          }`}
        >
          {isIncome ? '↑ Доход' : '↓ Расход'}
        </span>
      </span>
      <span className="text-sm text-[var(--card-foreground)] truncate pr-4">{t.name ?? 'Без категории'}</span>
      <span className={`text-right text-sm font-500 font-mono ${isIncome ? 'text-[var(--accent)]' : 'text-[var(--danger)]'}`}>
        {isIncome ? '+' : '-'}
        {formatCurrency(t.transaction.amount)}
      </span>
      <div className="flex justify-end">
        <button
          onClick={() => deleteTransaction(t.transaction.id)}
          className="w-7 h-7 rounded-md flex items-center justify-center text-[var(--muted-foreground)] hover:text-[var(--danger)] hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
          aria-label="Удалить"
        >
          <CloseIcon />
        </button>
      </div>
    </div>
  )
}
