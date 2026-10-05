import { Navigate } from 'react-router-dom'

// Protege las rutas internas: si no hay usuario registrado, vuelve a la bienvenida
function RequireUser({ user, children }) {
  return user ? children : <Navigate to="/" replace />
}

export default RequireUser
