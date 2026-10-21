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

export const formattedDeadline = (date: string): string => {
  const month = new Intl.DateTimeFormat('ru-RU', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${date.slice(0, 7)}-01`)).replace(' г.', '')

  return month[0].charAt(0).toUpperCase() + month.slice(1)
}