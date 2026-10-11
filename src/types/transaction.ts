import type { TransactionType } from './category'

export interface Transaction {
  name: string
  transaction: {
    id: number
    category_id: number
    type: TransactionType
    amount: number
    date: string
    description: string | null
  }
}

export interface TransactionCreate {
  category_id: number
  type: TransactionType
  amount: number
  date: string
  description?: string | null
}

export interface TransactionFormState {
  type: TransactionType
  category_id: number | ''
  amount: string
  date: string
  description: string
}
