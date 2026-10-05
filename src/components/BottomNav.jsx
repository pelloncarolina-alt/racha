import { Link, useLocation } from 'react-router-dom'

const ITEMS = [
  { to: '/inicio', icon: '🏠', label: 'HOME', also: ['/resultados'] },
  { to: '/amigos', icon: '👥', label: 'FRIENDS', also: [] },
  { to: '/perfil', icon: '👤', label: 'PROFILE', also: [] },
]

function BottomNav() {
  const { pathname } = useLocation()

  return (
    <footer className="bottom-nav">
      {ITEMS.map((item) => {
        const active = pathname === item.to || item.also.includes(pathname)
        return (
          <Link
            key={item.to}
            to={item.to}
            className={`bottom-nav-item ${active ? 'active' : ''}`}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        )
      })}
    </footer>
  )
}

export default BottomNav
