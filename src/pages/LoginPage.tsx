import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../store/api/authApi'
import { getErrorMessage } from '../utils/getErrorMessage'

export default function LoginPage() {
  const navigate = useNavigate()
  const [login] = useLoginMutation()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault()

    setError('')
    setIsLoading(true)

    try {
      await login({ username, password }).unwrap()
      navigate('/')
    } catch (error) {
      setError(getErrorMessage(error, 'Не удалось войти в аккаунт'))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex items-center justify-center px-5 py-10 transition-colors duration-300">
      <div className="w-full max-w-md">

        <div className="mb-8 text-center">
          <h1 className="font-display text-3xl font-600 tracking-tight">
            Fintrack
          </h1>

          <p className="mt-2 text-sm text-[var(--muted-foreground)]">
            Войдите в свой аккаунт
          </p>
        </div>

        <div className="bg-[var(--card)] border border-[var(--border)] rounded-[var(--radius)] p-6">
          <form onSubmit={handleSubmit} className="space-y-5">

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="username"
                className="text-xs font-500 text-[var(--muted-foreground)] uppercase tracking-wider"
              >
                Имя пользователя
              </label>

              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Введите username"
                autoComplete="username"
                required
                className="h-11 px-3 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm placeholder:text-[var(--muted-foreground)]"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="password"
                className="text-xs font-500 text-[var(--muted-foreground)] uppercase tracking-wider"
              >
                Пароль
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Введите пароль"
                autoComplete="current-password"
                required
                className="h-11 px-3 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm placeholder:text-[var(--muted-foreground)]"
              />
            </div>

            {error && (
              <div className="rounded-lg border border-[var(--danger)]/30 bg-[var(--danger)]/10 px-3 py-2">
                <p className="text-sm text-[var(--danger)]">
                  {error}
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] text-sm font-500 hover:opacity-80 transition-opacity cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Вход…' : 'Войти'}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-[var(--border)] text-center">
            <p className="text-sm text-[var(--muted-foreground)]">
              Нет аккаунта?{' '}
              <Link
                to="/register"
                className="font-500 text-[var(--foreground)] hover:text-[var(--accent)] transition-colors"
              >
                Зарегистрироваться
              </Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}