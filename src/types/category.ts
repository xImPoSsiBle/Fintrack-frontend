export type TransactionType = 'income' | 'expense'

export interface Category {
  id: number
  name: string
  type: TransactionType
  user_id: number | null
}

export interface CategoryCreate {
  name: string
  type: TransactionType
}

export interface CategoryUpdate {
  name?: string
  type?: TransactionType
}
