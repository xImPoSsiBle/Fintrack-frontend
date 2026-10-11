import { IoExitOutline, IoMoonOutline, IoSunnyOutline } from 'react-icons/io5'
import { LogoIcon } from '../icons/Icons'
import { authApi, useLogoutMutation } from '../../store/api/authApi'
import { useAppDispatch } from '../../hooks/redux'

interface HeaderProps {
  dark: boolean
  onToggleDark: () => void
}

export function Header({ dark, onToggleDark }: HeaderProps) {
  const [logout] = useLogoutMutation()
  const dispatch = useAppDispatch()

  const clickHandler = async () => {
    try {
      await logout()
      dispatch(authApi.util.resetApiState())
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/90 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[var(--accent)] flex items-center justify-center">
            <LogoIcon />
          </div>
          <span className="text-xl font-600 tracking-tight font-display">FinTrack</span>
        </div>
        <div className='flex gap-3'>
          <button
            onClick={onToggleDark}
            className="w-10 h-10 rounded-full border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--secondary)] transition-colors flex items-center justify-center cursor-pointer"
            aria-label="Переключить тему"
          >
            {dark ? <IoSunnyOutline /> : <IoMoonOutline />}
          </button>
          <button className='cursor-pointer' onClick={clickHandler}>
            <IoExitOutline className='w-6 h-6' />
          </button>
        </div>
      </div>
    </header>
  )
}
