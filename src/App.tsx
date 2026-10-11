import { Navigate } from 'react-router-dom'
import { ChartsSection } from './components/dashboard/ChartsSection'
import { PieChartsSection } from './components/dashboard/PieChartsSection'
import { SummaryCards } from './components/dashboard/SummaryCards'
import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import { TransactionForm } from './components/transactions/TransactionForm'
import { TransactionsList } from './components/transactions/TransactionsList'
import { useMeQuery } from './store/api/authApi'

interface AppProps {
  dark: boolean
  onToggleDark: () => void
}

export default function App({ dark, onToggleDark }: AppProps) {
  const { data: user, isLoading } = useMeQuery()

  if (isLoading) {
    return <div>Загрузка...</div>
  }

  if (!user) {
    return <Navigate to={'/login'} />
  }

  return (
    <div className={dark ? 'dark' : ''}>
      <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">
        <Header dark={dark} onToggleDark={onToggleDark} />

        <main className="max-w-6xl mx-auto px-5 py-8 space-y-8">
          <SummaryCards />
          <ChartsSection />
          <PieChartsSection />
          <TransactionForm />
          <TransactionsList />
        </main>

        <Footer />
      </div>
    </div>
  )
}
