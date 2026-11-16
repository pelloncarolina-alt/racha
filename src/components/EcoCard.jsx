import { Link } from 'react-router-dom'

// El Eco de ayer: muestra la mecánica del desafío de ayer y permite repasarla
function EcoCard({ game, status }) {
  return (
    <Link to={`/jugar/${game.id}`} className="eco-card eco-card-link" data-testid="eco-card">
      <p className="eco-card-label">✨ ECO DE HOY · VIENE DE AYER</p>
      <div className="eco-card-content">
        <span className="eco-card-icon">{game.icon}</span>
        <div>
          <p className="eco-card-mechanic">{game.short.toUpperCase()}</p>
          <p className="eco-card-status">{status}</p>
        </div>
        <span className="eco-card-arrow">›</span>
      </div>
    </Link>
  )
}

export default EcoCard
