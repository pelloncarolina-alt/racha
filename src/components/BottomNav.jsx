import { Link, useLocation } from 'react-router-dom'

const ITEMS = [
  { to: '/inicio', icon: '🏠', label: 'INICIO', also: ['/resultados'] },
  { to: '/juegos', icon: '🎮', label: 'JUEGOS', also: [] },
  { to: '/amigos', icon: '👥', label: 'AMIGOS', also: [] },
  { to: '/perfil', icon: '👤', label: 'PERFIL', also: [] },
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
