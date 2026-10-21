import { useState } from "react"
import { useCreateGoalMutation } from "../../store/api/goalsApi";
import type { GoalFormState } from "../../types/goal";

const getYearMonthISO = () => new Date().toISOString().slice(0, 7);

const EMPTY_FORM: GoalFormState = {
    name: '',
    target_amount: 0,
    deadline: getYearMonthISO()
}

const GoalForm = () => {
    const [createGoal] = useCreateGoalMutation()

    const [form, setForm] = useState(EMPTY_FORM)

    const updateForm = (patch: Partial<GoalFormState>) => {
        setForm((f) => ({ ...f, ...patch }))
    }

    return (
        <div className="bg-card border border-border rounded-[var(--radius)] grid md:grid-cols-[1.4fr_1fr_1fr_auto] items-end gap-3 p-4">
            <div className="flex flex-col gap-1.5">
                <label
                    htmlFor="name"
                    className="text-muted-foreground"
                >
                    НАЗВАНИЕ
                </label>
                <input
                    id="name"
                    type="text"
                    placeholder="На что копим?"
                    onChange={e => updateForm({ name: e.target.value })}
                    className="h-11 px-3 rounded-lg border border-border bg-background text-foreground"
                />
            </div>
            <div className="flex flex-col gap-1.5">
                <label
                    htmlFor="targetAmount"
                    className="text-muted-foreground"
                >
                    НУЖНАЯ СУММА
                </label>
                <input
                    id="targetAmount"
                    type="number"
                    placeholder="0 ₸"
                    onChange={e => updateForm({ target_amount: Number(e.target.value) })}
                    className="h-11 px-3 rounded-lg border border-border bg-background text-foreground"
                />
            </div>
            <div className="flex flex-col gap-1.5">
                <label
                    htmlFor="date"
                    className="text-muted-foreground"
                >
                    СРОК
                </label>
                <input
                    id="date"
                    type="month"
                    onChange={e => updateForm({ deadline: e.target.value })}
                    className="h-11 px-3 rounded-lg border border-border bg-background text-foreground"
                />
            </div>
            <button
                onClick={() => createGoal({...form, deadline: `${form.deadline}-01`})}
                className="h-11 px-5 rounded-lg bg-primary text-primary-foreground text-sm font-500 hover:opacity-80 transition-opacity cursor-pointer whitespace-nowrap disabled:opacity-50"
            >
                Создать цель
            </button>
        </div>
    )
}

export default GoalForm