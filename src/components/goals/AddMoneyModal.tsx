import { useEffect, useState } from "react"
import type { Goal } from "../../types/goal"
import { formatCurrency } from "../../utils/format"
import { useAddContributionMutation, useGetAvailableQuery } from "../../store/api/goalsApi"
// import { useAddContributionMutation, useGetAvailableQuery } from "../../store/api/goalsApi"

interface AddMoneyModalProps {
    goal: Goal
    onClose: () => void
}

const AddMoneyModal = ({ goal, onClose }: AddMoneyModalProps) => {
    const [amount, setAmount] = useState("")
    const [error, setError] = useState("")

    const { data: available = 0 } = useGetAvailableQuery()
    const [addContribution, { isLoading }] = useAddContributionMutation()

    const free = Math.max(available, 0)
    const value = Number(amount.replace(",", "."))
    const isInvalid = !value || value <= 0 || value > free

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose()
        }
        window.addEventListener("keydown", onKeyDown)
        return () => window.removeEventListener("keydown", onKeyDown)
    }, [onClose])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (isInvalid) return

        try {
            await addContribution({ goalId: goal.id, amount: value }).unwrap()
            onClose()
        } catch (err) {
            const detail = (err as { data?: { detail?: unknown } }).data?.detail
            setError(typeof detail === "string" ? detail : "Не удалось пополнить цель")
        }
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
            onClick={onClose}
        >
            <form
                onSubmit={handleSubmit}
                onClick={e => e.stopPropagation()}
                className="w-full max-w-md rounded-[var(--radius)] bg-card p-6 border border-border space-y-5"
            >
                <div>
                    <h2 className="text-xl font-bold">Пополнить «{goal.name}»</h2>
                    <span className="text-sm text-muted-foreground">
                        Осталось до цели: {formatCurrency(goal.remaining)}
                    </span>
                </div>

                <div className="space-y-2">
                    <input
                        type="number"
                        inputMode="decimal"
                        min="0"
                        step="0.01"
                        autoFocus
                        value={amount}
                        onChange={e => { setAmount(e.target.value); setError("") }}
                        placeholder="Сумма"
                        className="h-11 w-full rounded-lg border border-border bg-background px-3 font-mono"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Доступно: {formatCurrency(free)}</span>
                        <button
                            type="button"
                            onClick={() => setAmount(String(Math.min(goal.remaining, free)))}
                            className="cursor-pointer hover:text-foreground"
                        >
                            Внести остаток
                        </button>
                    </div>
                    {value > free && (
                        <p className="text-sm text-red-500">Сумма больше доступных средств</p>
                    )}
                    {error && <p className="text-sm text-red-500">{error}</p>}
                </div>

                <div className="flex justify-end gap-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="h-10 px-4 rounded-lg text-sm hover:bg-muted cursor-pointer"
                    >
                        Отмена
                    </button>
                    <button
                        type="submit"
                        disabled={isInvalid || isLoading}
                        className="h-10 px-4 rounded-lg bg-primary text-primary-foreground text-sm hover:opacity-80 cursor-pointer disabled:opacity-50"
                    >
                        {isLoading ? "Пополняем..." : "Пополнить"}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddMoneyModal