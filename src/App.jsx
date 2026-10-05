import { useState } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import AppLayout from './components/AppLayout'
import RequireUser from './components/RequireUser'
import WelcomeScreen from './screens/WelcomeScreen'
import RegisterScreen from './screens/RegisterScreen'
import HomeScreen from './screens/HomeScreen'
import FriendsScreen from './screens/FriendsScreen'
import ProfileScreen from './screens/ProfileScreen'
import GameScreen from './screens/GameScreen'
import ResultsScreen from './screens/ResultsScreen'
import {
  loadUser,
  saveUser,
  clearUser,
  createUser,
  registerResult,
} from './utils/storage'
import './App.css'

function App() {
  const navigate = useNavigate()
  const [user, setUser] = useState(() => loadUser())
  const [result, setResult] = useState(null)

  function handleRegister(data) {
    const newUser = createUser(data)
    saveUser(newUser)
    setUser(newUser)
    navigate('/inicio')
  }

  function handleSwitchAccount() {
    clearUser()
    setUser(null)
    navigate('/registro')
  }

  function handleLogout() {
    clearUser()
    setUser(null)
    setResult(null)
    navigate('/')
  }

  function handleFinish(gameResult) {
    const isNewBest = gameResult.score > user.bestScore
    const updated = registerResult(user, gameResult.score)
    saveUser(updated)
    setUser(updated)
    setResult({ ...gameResult, isNewBest })
    navigate('/resultados')
  }

  return (
    <Routes>
      {/* Pantallas sin barra de navegación */}
      <Route
        path="/"
        element={
          <WelcomeScreen
            user={user}
            onRegister={() => navigate('/registro')}
            onContinue={() => navigate('/inicio')}
            onSwitchAccount={handleSwitchAccount}
          />
        }
      />
      <Route
        path="/registro"
        element={<RegisterScreen onSubmit={handleRegister} onBack={() => navigate('/')} />}
      />
      <Route
        path="/juego"
        element={
          <RequireUser user={user}>
            <GameScreen onQuit={() => navigate('/inicio')} onFinish={handleFinish} />
          </RequireUser>
        }
      />

      {/* Pantallas internas: comparten header y barra de abajo */}
      <Route
        element={
          <RequireUser user={user}>
            <AppLayout user={user} />
          </RequireUser>
        }
      >
        <Route path="/inicio" element={<HomeScreen user={user} onPlay={() => navigate('/juego')} />} />
        <Route path="/amigos" element={<FriendsScreen />} />
        <Route path="/perfil" element={<ProfileScreen user={user} onLogout={handleLogout} />} />
      </Route>

      {/* Resultados: sin header; si se entra directo sin haber jugado, vuelve al inicio */}
      <Route
        element={
          <RequireUser user={user}>
            <AppLayout user={user} withHeader={false} />
          </RequireUser>
        }
      >
        <Route
          path="/resultados"
          element={
            result ? (
              <ResultsScreen result={result} user={user} onHome={() => navigate('/inicio')} />
            ) : (
              <Navigate to="/inicio" replace />
            )
          }
        />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
