import { CATEGORIES } from '../game/catalog'

function ChallengeCard({ game, playedToday, onPlay }) {
  return (
    <section className="challenge-card">
      <p className="challenge-card-label">
        DESAFÍO DIARIO · {CATEGORIES[game.category].label}
      </p>
      <h2 className="challenge-card-title">
        <span className="challenge-card-icon">{game.icon}</span> {game.name.toUpperCase()}
      </h2>
      <p className="challenge-card-tagline">{game.tagline}</p>
      <p className="challenge-card-goal">🎯 Meta: {game.goal.toLocaleString('en-US')} pts para sumar tu racha</p>
      {playedToday && (
        <p className="challenge-card-done">✓ Hoy ya sumaste tu racha. Podés seguir jugando.</p>
      )}
      <button className="challenge-card-button" onClick={onPlay}>
        {playedToday ? 'JUGAR DE NUEVO' : 'JUGAR DESAFÍO'}
      </button>
    </section>
  )
}

export default ChallengeCard
