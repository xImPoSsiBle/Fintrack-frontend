import { useState } from 'react'
import { useCreateCategoryMutation } from '../../store/api/categoriesApi'
import type { TransactionType } from '../../types/category'

interface CategoryFormProps {
  type: TransactionType
}

export function CategoryForm({ type }: CategoryFormProps) {
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [createCategory, { isLoading }] = useCreateCategoryMutation()

  async function handleSubmit() {
    if (!name.trim()) {
      setError('Введите название')
      return
    }
    try {
      await createCategory({ name: name.trim(), type }).unwrap()
      setName('')
      setError('')
    } catch (err: any) {
      setError(err?.data?.detail || 'Не удалось создать категорию')
    }
  }

  return (
    <div className="flex gap-2 items-start">
      <div className="flex-1 flex flex-col gap-1">
        <input
          type="text"
          placeholder="Новая категория"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          className="h-10 px-3 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm placeholder:text-[var(--muted-foreground)]"
        />
        {error && <p className="text-xs text-[var(--danger)]">{error}</p>}
      </div>
      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className="h-10 px-4 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] text-sm font-500 hover:opacity-80 transition-opacity cursor-pointer disabled:opacity-50 whitespace-nowrap"
      >
        + Добавить
      </button>
    </div>
  )
}
