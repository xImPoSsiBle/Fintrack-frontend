import { useState } from 'react'
import { useDeleteCategoryMutation, useUpdateCategoryMutation } from '../../store/api/categoriesApi'
import type { Category } from '../../types/category'
import { CiEdit, CiTrash } from 'react-icons/ci'

interface CategoryRowProps {
  category: Category
}

export function CategoryList({ category }: CategoryRowProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(category.name)
  const [error, setError] = useState('')
  const [updateCategory, { isLoading }] = useUpdateCategoryMutation()
  const [deleteCategory] = useDeleteCategoryMutation()

  const isSystem = category.user_id === null

  async function handleSave() {
    if (!name.trim()) {
      setError('Название не может быть пустым')
      return
    }
    try {
      await updateCategory({ id: category.id, data: { name: name.trim() } }).unwrap()
      setIsEditing(false)
      setError('')
    } catch (err: any) {
      setError(err?.data?.detail || 'Не удалось сохранить')
    }
  }

  if (isEditing) {
    return (
      <div className="flex items-center gap-2 py-1.5">
        <input
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSave()}
          className="flex-1 h-8 px-2 rounded-md border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm"
        />
        <button
          onClick={handleSave}
          disabled={isLoading}
          className="text-xs px-2 py-1 rounded-md bg-[var(--accent)] text-white cursor-pointer disabled:opacity-50"
        >
          Сохранить
        </button>
        <button
          onClick={() => {
            setIsEditing(false)
            setName(category.name)
            setError('')
          }}
          className="text-xs px-2 py-1 rounded-md text-[var(--muted-foreground)] hover:bg-[var(--muted)] cursor-pointer"
        >
          Отмена
        </button>
        {error && <p className="text-xs text-[var(--danger)]">{error}</p>}
      </div>
    )
  }

  return (
    <div className="flex items-center justify-between py-1.5 group">
      <span className="text-sm text-[var(--card-foreground)]">{category.name}</span>
      {!isSystem && (
        <div className='flex gap-3'>
          <CiEdit
            onClick={() => setIsEditing(true)}
            className="w-6 h-6 hover:text-[var(--foreground)] opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
          />
          <CiTrash
            onClick={() => deleteCategory(category.id)}
            className="w-6 h-6 hover:text-[var(--foreground)] opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
          />
        </div>
      )}
    </div>
  )
}
