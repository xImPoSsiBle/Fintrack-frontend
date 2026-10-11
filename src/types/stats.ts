export interface SummaryStat {
    income: number
    expense: number
    balance: number
}

export interface MonthlyStat {
    month: string
    income: number
    expense: number
}

export interface ByCategory {
    name: string
    value: number
}