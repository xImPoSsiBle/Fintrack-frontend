import { SummaryCard } from "../components/dashboard/SummaryCard"
import { formatCurrency } from "../utils/format"
import EmptyState from "../components/ui/EmptyState"
import GoalCard from "../components/goals/GoalCard"
import { useGetAllGoalsQuery } from "../store/api/goalsApi"
import GoalForm from "../components/goals/GoalForm"
import { useState } from "react"
import AddMoneyModal from "../components/goals/AddMoneyModal"

const GoalsPage = () => {
    const { data: goals = [] } = useGetAllGoalsQuery()

    const [showForm, setShowForm] = useState(false)
    const [selectedGoalId, setSelectedGoalId] = useState<number | null>(null)
    const selectedGoal = goals.find(g => g.id === selectedGoalId)

    const addMoney = (id: number) => setSelectedGoalId(id)

    const accumulated = goals.reduce((acc, goal) => {
        if (goal.percent === 100) return 0
        return acc += goal.currentAmount
    }, 0)

    const generalGoal = goals.reduce((acc, goal) => {
        if (goal.percent === 100) return 0
        return acc += goal.targetAmount
    }, 0)

    return (
        <main className="max-w-6xl mx-auto px-5 py-8 space-y-8">
            <div>
                <h1 className="text-3xl font-bold">Накопления</h1>
                <span className="text-muted-foreground">Двигайтесь к важным покупкам спокойно</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <SummaryCard label="Уже накоплено" value={formatCurrency(accumulated)} color="accent" highlight />
                <SummaryCard label="Общая цель" value={formatCurrency(generalGoal)} />
            </div>
            <div className="flex justify-between gap-2 flex-col sm:flex-row">
                <div>
                    <h2 className="text-2xl font-bold">Мои цели</h2>
                    <span className="text-muted-foreground">Маленькие шаги складываются в большие планы</span>
                </div>
                <button
                    onClick={() => setShowForm(state => !state)}
                    className="h-11 px-5 rounded-lg bg-primary text-primary-foreground text-sm font-500 hover:opacity-80 transition-opacity cursor-pointer whitespace-nowrap disabled:opacity-50"
                >
                    {showForm ? 'Скрыть' : '+ Новая цель'}
                </button>
            </div>
            {showForm && <GoalForm />}
            {goals.length === 0 &&
                <EmptyState message="Пока нет целей. Добавьте первую цель выше." />
            }
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {goals.map(goal => (
                    <GoalCard key={goal.id} goal={goal} addMoney={addMoney} />
                ))}
            </div>
            {selectedGoal && (
                <AddMoneyModal goal={selectedGoal} onClose={() => setSelectedGoalId(null)} />
            )}
        </main>
    )
}

export default GoalsPage