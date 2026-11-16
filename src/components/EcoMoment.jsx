import { useEffect, useRef, useState } from 'react'
import { GAME_COMPONENTS } from '../games'
import TimeBar from './TimeBar'
import { createEcoChallenge, ECO_HITS, ECO_SECONDS, ECO_BONUS } from '../game/eco'

const INTRO_MS = 2200
const RESULT_MS = 1600
const CLOCK_MS = 100

// El Eco: un fragmento del juego de ayer que aparece de sorpresa dentro del desafío de hoy.
// Reusa el mismo componente del juego de ayer, pero con su propio contador de aciertos.
function EcoMoment({ game, onDone }) {
  const Comp = GAME_COMPONENTS[game.id]
  const [stage, setStage] = useState('intro') // intro | play | result
  const [hits, setHits] = useState(0)
  const [status, setStatus] = useState('open')
  const eco = useRef(createEcoChallenge())
  const doneRef = useRef(onDone)
  const timers = useRef([])

  useEffect(() => {
    doneRef.current = onDone
  }, [onDone])

  // Intro → juego
  useEffect(() => {
    const list = timers.current
    list.push(setTimeout(() => setStage('play'), INTRO_MS))
    return () => list.forEach((t) => clearTimeout(t) || clearInterval(t))
  }, [])

  // Reloj del Eco
  useEffect(() => {
    if (stage !== 'play') return undefined
    const startedAt = performance.now()
    const id = setInterval(() => {
      const s = eco.current.status(performance.now() - startedAt)
      if (s !== 'open') {
        clearInterval(id)
        setStatus(s)
        setStage('result')
        timers.current.push(setTimeout(() => doneRef.current(s), RESULT_MS))
      }
    }, CLOCK_MS)
    timers.current.push(id)
    return () => clearInterval(id)
  }, [stage])

  // Lo que recibe el juego de ayer: cuenta aciertos del Eco (no suma al puntaje normal)
  const api = useRef({
    hit() {
      eco.current.hit()
      setHits(eco.current.hits)
    },
    miss() {
      eco.current.miss()
    },
  }).current

  return (
    <div className="eco-moment" data-testid="eco-moment" data-stage={stage}>
      {stage === 'intro' && (
        <div className="eco-intro">
          <p className="eco-spark">✨</p>
          <p className="eco-title">¡ECO DE AYER!</p>
          <p className="eco-game">
            {game.icon} {game.name}
          </p>
          <p className="eco-text">
            Lográ {ECO_HITS} aciertos en {ECO_SECONDS} segundos y sumás +{ECO_BONUS} puntos.
            El reloj del desafío está en pausa.
          </p>
        </div>
      )}

      {stage === 'play' && (
        <>
          <div className="eco-head">
            <span className="eco-head-name">
              ✨ ECO · {game.icon} {game.short}
            </span>
            <span className="eco-dots" data-testid="eco-dots">
              {Array.from({ length: ECO_HITS }, (_, i) => (
                <i key={i} className={i < hits ? 'eco-dot-on' : ''} />
              ))}
            </span>
          </div>
          <TimeBar limitMs={ECO_SECONDS * 1000} barKey="eco" />
          <div className="eco-play">
            <Comp level={3} api={api} />
          </div>
        </>
      )}

      {stage === 'result' && (
        <div className="eco-intro" data-testid="eco-result" data-status={status}>
          <p className="eco-spark">{status === 'closed' ? '✨' : '🌫️'}</p>
          <p className="eco-title">{status === 'closed' ? '¡ECO CERRADO!' : 'EL ECO SE DESVANECIÓ'}</p>
          <p className="eco-text">
            {status === 'closed'
              ? `+${ECO_BONUS} puntos. Volvemos al desafío.`
              : 'No llegaste a tiempo. Volvemos al desafío.'}
          </p>
        </div>
      )}
    </div>
  )
}

export default EcoMoment
