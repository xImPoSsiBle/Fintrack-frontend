import { Navigate, Outlet } from 'react-router-dom'

import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import { useMeQuery } from './store/api/authApi'

interface AppProps {
  dark: boolean
  onToggleDark: () => void
}

export default function App({ dark, onToggleDark }: AppProps) {
  const { data, isLoading } = useMeQuery()

  if (isLoading) {
    return <div>Загрузка...</div>
  }

  if (!data) {
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
