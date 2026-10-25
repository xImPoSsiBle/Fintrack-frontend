import { useState } from "react"
import { ChartsSection } from "../components/dashboard/ChartsSection"
import { PieChartsSection } from "../components/dashboard/PieChartsSection"
import { SummaryCards } from "../components/dashboard/SummaryCards"
import { TransactionForm } from "../components/transactions/TransactionForm"
import { TransactionsList } from "../components/transactions/TransactionsList"
import { PeriodFilter } from "../components/ui/PeriodFilter"
import type { Period } from "../types/period"


const DashboardPage = () => {
    const [period, setPeriod] = useState<Period>('all')

    return (
        <main className="max-w-6xl mx-auto px-5 py-8 space-y-8">
            <PeriodFilter value={period} onChange={setPeriod}/>
            <SummaryCards period={period}/>
            <ChartsSection period={period}/>
            <PieChartsSection period={period}/>
            <TransactionForm />
            <TransactionsList period={period}/>
        </main>
    )
}

export default DashboardPage