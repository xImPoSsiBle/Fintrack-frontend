import { Route, Routes } from "react-router-dom"
import App from "./App"
import { useState } from "react"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"

function AppLayout() {
  const [dark, setDark] = useState(false)
  
  return (
    <div className={dark ? 'dark' : ''}>
      <Routes>
        <Route
          path="/"
          element={
            <App
              dark={dark}
              onToggleDark={() => setDark((d) => !d)}
            />
          }
        />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </div>
  )
}

export default AppLayout;