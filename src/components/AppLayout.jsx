import { Outlet } from 'react-router-dom'
import Header from './Header'
import BottomNav from './BottomNav'

// Marco común de las pantallas internas: header arriba, contenido en el medio
// (el <Outlet /> es donde React Router dibuja la pantalla de la ruta) y la barra de abajo.
function AppLayout({ user, withHeader = true }) {
  return (
    <div className="app">
      {withHeader && <Header user={user} />}
      <main className="main-content">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  )
}

export default AppLayout
