import { useState } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import AppLayout from './components/AppLayout'
import { getGame } from './game/catalog'
import { outcomeOf } from './game/messages'
import RequireUser from './components/RequireUser'
import WelcomeScreen from './pages/WelcomeScreen'
import RegisterScreen from './pages/RegisterScreen'
import HomeScreen from './pages/HomeScreen'
import FriendsScreen from './pages/FriendsScreen'
import ProfileScreen from './pages/ProfileScreen'
import GamePage from './pages/GamePage'
import GamesPage from './pages/GamesPage'
import ResultsScreen from './pages/ResultsScreen'
import {
  loadUser,
  saveUser,
  clearUser,
  createUser,
  registerResult,
  registerPractice,
} from './utils/storage'
import './App.css'
import './games/games.css'
import './glass.css'

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

  // Termina una partida.
  //  - Desafío del día GANADO (llegó a la meta): suma un día de racha.
  //  - Desafío del día perdido o práctica: no suma racha, pero guarda el récord.
  function handleFinish(gameResult, gameId, mode) {
    const isNewBest = gameResult.score > (user.bests[gameId] || 0)
    const outcome = outcomeOf(gameResult, getGame(gameId), mode)
    let updated = outcome.streakCounts
      ? registerResult(user, gameResult.score, gameId)
      : registerPractice(user, gameId, gameResult.score)
    if (gameResult.eco === 'closed') updated = { ...updated, ecos: (updated.ecos || 0) + 1 }
    saveUser(updated)
    setUser(updated)
    setResult({ ...gameResult, gameId, mode, isNewBest })
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
            <GamePage daily onQuit={() => navigate('/inicio')} onFinish={handleFinish} />
          </RequireUser>
        }
      />
      <Route
        path="/jugar/:gameId"
        element={
          <RequireUser user={user}>
            <GamePage onQuit={() => navigate('/juegos')} onFinish={handleFinish} />
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
        <Route path="/juegos" element={<GamesPage user={user} />} />
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
