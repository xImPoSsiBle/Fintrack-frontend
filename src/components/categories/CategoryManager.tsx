import { useState } from 'react'
import { useGetCategoriesByTypeQuery } from '../../store/api/categoriesApi'
import type { TransactionType } from '../../types/category'
import { CategoryForm } from './CategoryForm'
import { CategoryList } from './CategoryList'

const TYPE_OPTIONS: TransactionType[] = ['expense', 'income']

export function CategoryManager() {
  const [type, setType] = useState<TransactionType>('expense')
  const { data: categories = [], isFetching } = useGetCategoriesByTypeQuery(type)
  
  return (
    <div className="bg-[var(--card)] border border-[var(--border)] rounded-[var(--radius)] p-5 mt-5">
      <h2 className="text-base font-600 mb-4 text-[var(--card-foreground)] font-display">Категории</h2>

      <div className="flex rounded-lg border border-[var(--border)] overflow-hidden h-10 mb-4 max-w-[240px]">
        {TYPE_OPTIONS.map((t) => (
          <button
            key={t}
            onClick={() => setType(t)}
            className={`flex-1 text-sm font-500 transition-colors cursor-pointer ${
              type === t
                ? t === 'income'
                  ? 'bg-[var(--accent)] text-white'
                  : 'bg-[var(--danger)] text-white'
                : 'bg-transparent text-[var(--muted-foreground)] hover:bg-[var(--muted)]'
            }`}
          >
            {t === 'income' ? 'Доход' : 'Расход'}
          </button>
        ))}
      </div>

      <div className="divide-y divide-[var(--border)] mb-4">
        {isFetching && <p className="text-sm text-[var(--muted-foreground)] py-2">Загрузка…</p>}
        {!isFetching && categories.length === 0 && (
          <p className="text-sm text-[var(--muted-foreground)] py-2">Нет категорий этого типа</p>
        )}
        {categories.map((c) => (
          <CategoryList key={c.id} category={c} />
        ))}
      </div>

      <CategoryForm type={type} />
    </div>
  )
}
