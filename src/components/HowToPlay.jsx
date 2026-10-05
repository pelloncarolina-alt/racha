import { GAME_SECONDS, POINTS, COMBO_STEP, MAX_MULTIPLIER } from '../game/config'

function HowToPlay({ onStart }) {
  return (
    <div className="game-overlay">
      <p className="challenge-card-label">DESAFÍO DIARIO</p>
      <h2 className="howto-title">REFLEJOS: EL PULSO NEÓN</h2>

      <ol className="howto-steps">
        <li>Un pulso de luz se achica hacia el aro.</li>
        <li>Tocá <strong>TAP</strong> justo cuando lo alcance.</li>
        <li>Cuanto más preciso, más puntos.</li>
      </ol>

      <div className="howto-points">
        <span>PERFECTO <strong>{POINTS.perfect}</strong></span>
        <span>GENIAL <strong>{POINTS.great}</strong></span>
        <span>BIEN <strong>{POINTS.good}</strong></span>
      </div>

      <p className="howto-note">
        {COMBO_STEP} aciertos seguidos suben el multiplicador (hasta x{MAX_MULTIPLIER}).
        Si fallás, el combo se corta. Tenés {GAME_SECONDS} segundos.
      </p>

      <button className="btn-primary" onClick={onStart}>
        EMPEZAR
      </button>
    </div>
  )
}

export default HowToPlay
