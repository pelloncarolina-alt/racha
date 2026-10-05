function GameHUD({ time, score, onClose }) {
  return (
    <div className="game-hud">
      <button className="game-hud-close" onClick={onClose} aria-label="Salir del juego">
        ✕
      </button>
      <div className="game-hud-stats">
        <div>
          <p className="game-hud-label">TIME</p>
          <p className={`game-hud-value ${time <= 10 ? 'game-hud-value-low' : ''}`}>
            {time}s
          </p>
        </div>
        <div>
          <p className="game-hud-label">SCORE</p>
          <p className="game-hud-value">{score.toLocaleString('en-US')}</p>
        </div>
      </div>
    </div>
  )
}

export default GameHUD
