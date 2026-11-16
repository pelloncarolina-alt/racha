import { COMBO_STEP, MAX_MULTIPLIER } from '../game/config'
import { CATEGORIES } from '../game/catalog'

// Pantalla de instrucciones de cualquier juego (se arma con los datos del catálogo)
function HowToPlay({ game, mode, ecoGame, ecoAtStart, onStart }) {
  const category = CATEGORIES[game.category]
  return (
    <div className="game-overlay">
      <p className="challenge-card-label">
        {mode === 'daily' ? 'DESAFÍO DIARIO' : 'PRÁCTICA'} · {category.label}
      </p>
      <h2 className="howto-title">
        <span className="howto-icon">{game.icon}</span> {game.name.toUpperCase()}
      </h2>

      <ol className="howto-steps">
        {game.steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>

      {game.chips && (
        <div className="howto-points">
          {game.chips.map(([label, pts]) => (
            <span key={label}>
              {label} <strong>{pts}</strong>
            </span>
          ))}
        </div>
      )}

      <p className="howto-levels">
        <strong>5 NIVELES.</strong> {game.hardens}
      </p>

      <p className="howto-goal">
        {mode === 'daily'
          ? `🎯 Meta: ${game.goal.toLocaleString('en-US')} puntos para sumar tu racha de hoy.`
          : `🎯 Meta de referencia: ${game.goal.toLocaleString('en-US')} puntos.`}
      </p>

      {ecoGame && (
        <p className="howto-eco">
          ✨ <strong>Eco de ayer:</strong>{' '}
          {ecoAtStart ? 'antes de empezar' : 'al llegar al nivel 3'} te aparece un fragmento de{' '}
          {ecoGame.name}. Cerralo y sumás +500.
        </p>
      )}

      <p className="howto-note">
        {COMBO_STEP} aciertos seguidos suben el multiplicador (hasta x{MAX_MULTIPLIER}). Un error
        corta el combo. Tenés {game.seconds} segundos.
      </p>

      <button className="btn-primary" onClick={onStart}>
        EMPEZAR
      </button>
    </div>
  )
}

export default HowToPlay
