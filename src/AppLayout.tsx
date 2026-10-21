import { Route, Routes } from "react-router-dom"
import App from "./App"
import { useState } from "react"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import DashboardPage from "./pages/DashboardPage"
import GoalsPage from "./pages/GoalsPage"

function AppLayout() {
  const [dark, setDark] = useState(false)

  return (
    <div className={dark ? 'dark' : ''}>
      <Routes>
        <Route element={
          <App
            dark={dark}
            onToggleDark={() => setDark((d) => !d)}
          />
        }>
          <Route index element={<DashboardPage />} />
          <Route path="goals" element={<GoalsPage />} />
        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </div>
  )
}

export default AppLayout;