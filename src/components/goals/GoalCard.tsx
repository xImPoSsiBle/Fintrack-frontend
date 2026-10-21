import { useDeleteGoalMutation } from "../../store/api/goalsApi"
import type { Goal } from "../../types/goal"
import { formatCurrency, formattedDeadline } from "../../utils/format"
import { getGoalColor } from "../../utils/goal"

interface GoalCardProps {
    goal: Goal
    addMoney: (id: number) => void
}

const GoalCard = ({ goal, addMoney }: GoalCardProps) => {
    const [deleteGoal] = useDeleteGoalMutation()

    const colors = getGoalColor(goal.percent)

    return (
        <div className="rounded-[var(--radius)] bg-card p-5 transition-colors border border-border">
            <div className="flex justify-between">
                <h3 className="text-md font-bold font-sans">
                    {goal.name}
                </h3>
                <span className="text-sm text-muted-foreground">
                    Срок: {formattedDeadline(goal.deadline)}
                </span>
            </div>
            <div className="flex justify-between items-end my-5">
                <div className="flex flex-col gap-2">
                    <span className="text-2xl font-mono">{formatCurrency(goal.currentAmount)}</span>
                    <span className="text-muted-foreground text-sm">из {formatCurrency(goal.targetAmount)}</span>
                </div>
                <span className={`text-2xl font-semibold font-display ${colors.text}`}>{goal.percent}%</span>
            </div>
            <div className="h-2.5 rounded-full bg-neutral-200">
                <div
                    className={`h-full rounded-full transition-all ${colors.bg}`}
                    style={{
                        width: `${goal.percent}%`
                    }}
                />
            </div>
            <div className="flex justify-between items-center mt-5">
                <span
                    className="text-muted-foreground text-sm"
                >
                    {goal.percent === 100
                        ? "Цель достигнута"
                        : `Осталось ${formatCurrency(goal.remaining)}`
                    }

                </span>
                <div className="flex gap-1">
                    <button
                        onClick={() => deleteGoal(goal.id)}
                        className="h-9 px-3 rounded-lg text-sm text-red-500 hover:bg-muted cursor-pointer"
                    >
                        Удалить
                    </button>
                    <button
                        onClick={() => addMoney(goal.id)}
                        className={`h-9 px-3 rounded-lg text-sm font-500 hover:bg-muted transition-opacity cursor-pointer whitespace-nowrap disabled:opacity-50 ${goal.percent === 100 && 'hidden'}`}
                    >
                        + Пополнить
                    </button>
                </div>
            </div>
        </div>
    )
}

export default GoalCard