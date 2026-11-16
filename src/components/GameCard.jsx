import { Link } from 'react-router-dom'
import { CATEGORIES } from '../game/catalog'

// Tarjeta de un juego en la lista de desafíos
function GameCard({ game, best, isToday }) {
  const category = CATEGORIES[game.category]
  return (
    <Link to={`/jugar/${game.id}`} className="game-card" data-testid={`card-${game.id}`}>
      <span className="game-card-icon" style={{ borderColor: category.color }}>
        {game.icon}
      </span>
      <div className="game-card-body">
        <p className="game-card-name">
          {game.name}
          {isToday && <span className="game-card-today">HOY</span>}
        </p>
        <p className="game-card-tagline">{game.tagline}</p>
        <p className="game-card-meta">
          {game.seconds} s · {best ? `Récord ${best.toLocaleString('en-US')}` : 'Sin jugar'}
        </p>
      </div>
      <span className="game-card-arrow">›</span>
    </Link>
  )
}

export default GameCard
