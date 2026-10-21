import { ChartsSection } from "../components/dashboard/ChartsSection"
import { PieChartsSection } from "../components/dashboard/PieChartsSection"
import { SummaryCards } from "../components/dashboard/SummaryCards"
import { TransactionForm } from "../components/transactions/TransactionForm"
import { TransactionsList } from "../components/transactions/TransactionsList"


const DashboardPage = () => {
    return (
        <main className="max-w-6xl mx-auto px-5 py-8 space-y-8">
            <SummaryCards />
            <ChartsSection />
            <PieChartsSection />
            <TransactionForm />
            <TransactionsList />
        </main>
    )
}

export default DashboardPage