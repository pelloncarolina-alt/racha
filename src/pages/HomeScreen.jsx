import { useState } from 'react'
import { Link } from 'react-router-dom'
import StreakBanner from '../components/StreakBanner'
import ChallengeCard from '../components/ChallengeCard'
import EcoCard from '../components/EcoCard'
import { hasPlayedToday } from '../utils/storage'
import { daysAgoKey } from '../utils/dates'
import { getDemoOffset, setDemoOffset } from '../utils/demo'
import { dailyGame, yesterdayGame, offsetFor } from '../game/daily'
import { GAMES } from '../game/catalog'

function HomeScreen({ user, onPlay }) {
  const [, refresh] = useState(0) // para volver a dibujar al cambiar el día de la demo
  const today = dailyGame()
  const yesterday = yesterdayGame()
  const playedYesterday = user.history.includes(daysAgoKey(1))
  const offset = getDemoOffset()

  function changeDemoDay(n) {
    setDemoOffset(n)
    refresh((x) => x + 1)
  }

  return (
    <>
      <StreakBanner streakCount={user.streak} username={user.username} />
      <ChallengeCard game={today} playedToday={hasPlayedToday(user)} onPlay={onPlay} />
      <EcoCard game={yesterday} status={`Te aparece de sorpresa en el desafío de hoy · ${playedYesterday ? 'ya lo jugaste' : 'practicalo'}`} />

      <section className="demo-box" data-testid="demo-box">
        <p className="demo-box-label">MODO DEMO · PROBÁ TODOS LOS JUEGOS</p>
        <p className="demo-box-text">
          En la app real hay un desafío por día. Acá elegís cuál toca hoy y lo jugás completo, con Eco,
          victoria o derrota:
        </p>
        <div className="demo-grid">
          {GAMES.map((game) => (
            <button
              key={game.id}
              className={`demo-chip${game.id === today.id ? ' demo-chip-active' : ''}`}
              onClick={() => changeDemoDay(offsetFor(game.id))}
              data-testid={`chip-${game.id}`}
            >
              <span>{game.icon}</span>
              <span>{game.short}</span>
            </button>
          ))}
        </div>
        <div className="demo-actions">
          <button className="demo-button" onClick={() => changeDemoDay(offset + 1)} data-testid="next-day">
            Pasar al día siguiente ›
          </button>
          {offset > 0 && (
            <button className="demo-button demo-button-soft" onClick={() => changeDemoDay(0)}>
              Volver a hoy
            </button>
          )}
        </div>
        {offset > 0 && (
          <p className="demo-box-text">Simulando {offset} {offset === 1 ? 'día' : 'días'} más adelante.</p>
        )}
      </section>

      <Link to="/juegos" className="home-more" data-testid="more-games">
        <span>🎮 Ver los {GAMES.length} desafíos</span>
        <span>›</span>
      </Link>
    </>
  )
}

export default HomeScreen
