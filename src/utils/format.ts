import { MONTHS } from "../constants/chart"

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('ru-KZ', {
    style: 'currency',
    currency: 'KZT',
    maximumFractionDigits: 0,
  }).format(amount)
}

export const formatMonth = (date: string): string => {
  return MONTHS[new Date(date).getMonth()]
}