function GameHUD({ time, score, level, onClose }) {
  return (
    <div className="game-hud">
      <button className="game-hud-close" onClick={onClose} aria-label="Salir del juego">
        ✕
      </button>
      <div className="game-hud-stats">
        <div>
          <p className="game-hud-label">TIEMPO</p>
          <p className={`game-hud-value ${time <= 10 ? 'game-hud-value-low' : ''}`}>
            {time}s
          </p>
        </div>
        <div>
          <p className="game-hud-label">NIVEL</p>
          <p className="game-hud-value game-hud-level" data-testid="level">{level}</p>
        </div>
        <div>
          <p className="game-hud-label">PUNTOS</p>
          <p className="game-hud-value">{score.toLocaleString('en-US')}</p>
        </div>
      </div>
    </div>
  )
}

export default GameHUD
