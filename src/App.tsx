import { Navigate, Outlet, Route, Routes } from 'react-router-dom'

import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import { useMeQuery } from './store/api/authApi'
import DashboardPage from './pages/DashboardPage'
import GoalsPage from './pages/GoalsPage'

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

        <Outlet />

        <Footer />
      </div>
    </div>
  )
}
