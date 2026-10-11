import { useState } from 'react'
import { useGetCategoriesByTypeQuery } from '../../store/api/categoriesApi'
import { useCreateTransactionMutation } from '../../store/api/transactionsApi'
import type { TransactionType } from '../../types/category'
import type { TransactionFormState } from '../../types/transaction'
import { CategoryManager } from '../categories/CategoryManager'

const TYPE_OPTIONS: TransactionType[] = ['expense', 'income']

const todayISO = () => new Date().toISOString().split('T')[0]

const EMPTY_FORM: TransactionFormState = {
  type: 'expense',
  category_id: '',
  amount: '',
  date: todayISO(),
  description: '',
}

export function TransactionForm() {
  const [form, setForm] = useState<TransactionFormState>(EMPTY_FORM)
  const [formError, setFormError] = useState('')
  const [showCategoryManager, setShowCategoryManager] = useState(false)

  const { data: categories = [], isFetching: isLoadingCategories } = useGetCategoriesByTypeQuery(form.type)
  const [createTransaction, { isLoading: isSubmitting }] = useCreateTransactionMutation()

  function updateForm(patch: Partial<TransactionFormState>) {
    setForm((f) => ({ ...f, ...patch }))
    setFormError('')
  }

  function selectType(type: TransactionType) {
    updateForm({ type, category_id: '' })
  }

  async function handleSubmit() {
    if (!form.category_id) {
      setFormError('Выберите категорию')
      return
    }
    const amount = parseFloat(form.amount)
    if (!amount || amount <= 0) {
      setFormError('Введите корректную сумму')
      return
    }
    if (!form.date) {
      setFormError('Укажите дату')
      return
    }

    try {
      await createTransaction({
        category_id: form.category_id,
        type: form.type,
        amount,
        date: form.date,
        description: form.description.trim() || null,
      }).unwrap()
      setForm({ ...EMPTY_FORM, type: form.type })
    } catch {
      setFormError('Не удалось сохранить транзакцию')
    }
  }

  return (
    <div className="bg-[var(--card)] border border-[var(--border)] rounded-[var(--radius)] p-5">
      <h2 className="text-base font-600 mb-4 text-[var(--card-foreground)] font-display">Добавить запись</h2>
      <div className="grid grid-cols-2 gap-3 max-[700px]:grid-cols-1">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-500 text-[var(--muted-foreground)] uppercase tracking-wider">Тип</label>
          <div className="flex rounded-lg border border-[var(--border)] overflow-hidden h-11">
            {TYPE_OPTIONS.map((t) => (
              <button
                key={t}
                onClick={() => selectType(t)}
                className={`flex-1 text-sm font-500 transition-colors cursor-pointer ${form.type === t
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
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-500 text-[var(--muted-foreground)] uppercase tracking-wider">Категория</label>
          <div className='w-full flex justify-between'>
            <select
              value={form.category_id}
              onChange={(e) => updateForm({ category_id: e.target.value ? Number(e.target.value) : '' })}
              disabled={isLoadingCategories}
              className="w-[80%] h-11 px-3 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm"
            >
              <option value="">{isLoadingCategories ? 'Загрузка…' : 'Выберите категорию'}</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            <button
              onClick={() => setShowCategoryManager(prev => !prev)}
              className='h-11 px-5 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] text-sm font-500 hover:opacity-80 transition-opacity cursor-pointer whitespace-nowrap disabled:opacity-50'
            >
              {showCategoryManager ? 'Скрыть' : 'Создать'}
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-500 text-[var(--muted-foreground)] uppercase tracking-wider">Сумма (₸)</label>
          <input
            type="number"
            placeholder="0"
            value={form.amount}
            onChange={(e) => updateForm({ amount: e.target.value })}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            className="h-11 px-3 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm font-mono placeholder:text-[var(--muted-foreground)]"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-500 text-[var(--muted-foreground)] uppercase tracking-wider">Дата</label>
          <input
            type="date"
            value={form.date}
            onChange={(e) => updateForm({ date: e.target.value })}
            className="h-11 px-3 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm font-mono"
          />
        </div>

        <div className="flex flex-col gap-1.5 col-span-2">
          <label className="text-xs font-500 text-[var(--muted-foreground)] uppercase tracking-wider">Описание (необязательно)</label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Например: обед с коллегами"
              value={form.description}
              onChange={(e) => updateForm({ description: e.target.value })}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              className="flex-1 h-11 px-3 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm placeholder:text-[var(--muted-foreground)]"
            />
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="h-11 px-5 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] text-sm font-500 hover:opacity-80 transition-opacity cursor-pointer whitespace-nowrap disabled:opacity-50"
            >
              {isSubmitting ? 'Сохранение…' : '+ Добавить'}
            </button>
          </div>
        </div>
      </div>
      {showCategoryManager && <CategoryManager />}
      {formError && <p className="mt-2 text-sm text-[var(--danger)]">{formError}</p>}
    </div>
  )
}
