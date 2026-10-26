import { IoExitOutline, IoMoonOutline, IoSunnyOutline } from 'react-icons/io5'
import { LogoIcon } from '../icons/Icons'
import { authApi, useLogoutMutation } from '../../store/api/authApi'
import { useAppDispatch } from '../../hooks/redux'
import { FiTarget } from 'react-icons/fi'
import { LuLayoutDashboard } from 'react-icons/lu'
import { type JSX } from 'react'
import { NavLink, useNavigate} from 'react-router-dom'

interface HeaderProps {
  dark: boolean
  onToggleDark: () => void
}

interface NavItems {
  id: number
  name: string
  icon: JSX.Element
  path: string
}

export function Header({ dark, onToggleDark }: HeaderProps) {
  const [logout] = useLogoutMutation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const navItems: NavItems[] = [
    { id: 1, name: 'Обзор', icon: <LuLayoutDashboard />, path: '/' },
    { id: 2, name: 'Накопления', icon: <FiTarget />, path: '/goals' },
  ]

  const clickHandler = async () => {
    try {
      await logout().unwrap()
      dispatch(authApi.util.resetApiState())
      navigate('/login')
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
        <div className='flex justify-between gap-5'>
          {navItems.map(nav => (
            <NavLink
              key={nav.id}
              to={nav.path}
              end={nav.path === '/'}
              className={({isActive}) => `flex items-center gap-2 cursor-pointer p-2 rounded-md ${isActive ? 'bg-[var(--muted)]' : ''}`}
            >
              {nav.icon}
              <span className='tracking-tight font-display'>{nav.name}</span>
            </NavLink>
          ))
          }
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
