export interface Goal {
    id: number
    name: string
    currentAmount: number
    targetAmount: number
    deadline: string
    percent: number
    remaining: number
}

export interface GoalFormState {
    name: string
    target_amount: number
    deadline: string
}