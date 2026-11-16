import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createRun } from '../game/run'
import { GAME_COMPONENTS } from '../games'
import GameHUD from './GameHUD'
import ComboBadge from './ComboBadge'
import FeedbackText from './FeedbackText'
import HowToPlay from './HowToPlay'
import Countdown from './Countdown'
import LevelBanner from './LevelBanner'
import EcoMoment from './EcoMoment'
import { shouldTriggerEco, ECO_BONUS } from '../game/eco'

const COUNTDOWN_FROM = 3
const COUNTDOWN_STEP_MS = 800
const CLOCK_MS = 100

/**
 * Marco común de los juegos nuevos: instrucciones, cuenta regresiva, reloj, nivel,
 * puntaje, combo y resultado final. Cada juego solo dibuja su tablero y avisa
 * si el jugador acertó (api.hit) o falló (api.miss).
 */
function GameShell({ game, mode, ecoGame, onFinish, onQuit }) {
  const GameComponent = GAME_COMPONENTS[game.id]
  const [run] = useState(() => createRun(game.seconds))
  const [phase, setPhase] = useState('intro') // intro | countdown | playing | eco | finished
  const [count, setCount] = useState(COUNTDOWN_FROM)
  const [timeLeft, setTimeLeft] = useState(game.seconds)
  const [level, setLevel] = useState(1)
  const [hud, setHud] = useState({ score: 0, combo: 0, multiplier: 1 })
  const [feedback, setFeedback] = useState(null)

  const phaseRef = useRef('intro')
  const finishRef = useRef(onFinish)
  const keyRef = useRef(0)
  const timers = useRef({ count: null, clock: null })
  const startRef = useRef(0) // cuándo empezó la partida
  const pausedRef = useRef(0) // cuánto tiempo estuvo en pausa (por el Eco)
  const ecoStartRef = useRef(0)
  const eco = useRef({ shown: false, status: null })

  useEffect(() => {
    finishRef.current = onFinish
  }, [onFinish])

  const goTo = useCallback((next) => {
    phaseRef.current = next
    setPhase(next)
  }, [])

  const flash = useCallback((grade, label, points) => {
    keyRef.current += 1
    setFeedback({ key: keyRef.current, grade, label, points })
  }, [])

  // Lo que reciben los juegos: acertar o fallar. Fuera de la partida no hacen nada.
  const api = useMemo(
    () => ({
      hit(basePoints, label = '¡BIEN!') {
        if (phaseRef.current !== 'playing') return null
        const r = run.hit(basePoints)
        setHud({ score: r.score, combo: r.combo, multiplier: r.multiplier })
        flash('good', label, r.points)
        return r
      },
      miss(label = 'ERROR') {
        if (phaseRef.current !== 'playing') return null
        const r = run.miss()
        setHud({ score: r.score, combo: r.combo, multiplier: r.multiplier })
        flash('miss', label, 0)
        return r
      },
    }),
    [run, flash],
  )

  // Reloj de la partida (descuenta el tiempo que estuvo en pausa por el Eco)
  const startClock = useCallback(() => {
    clearInterval(timers.current.clock)
    timers.current.clock = setInterval(() => {
      const t = run.tick(performance.now() - startRef.current - pausedRef.current)
      setLevel(t.level)
      setTimeLeft(t.timeLeft)
      if (t.finished) {
        clearInterval(timers.current.clock)
        goTo('finished')
        finishRef.current({
          ...run.result(game.id),
          eco: eco.current.status,
          ecoBonus: eco.current.status === 'closed' ? ECO_BONUS : 0,
        })
      } else if (shouldTriggerEco({ hasEco: ecoGame, alreadyShown: eco.current.shown, level: t.level })) {
        // Llegó el momento del Eco: se pausa el reloj y aparece el fragmento de ayer
        eco.current.shown = true
        clearInterval(timers.current.clock)
        ecoStartRef.current = performance.now()
        goTo('eco')
      }
    }, CLOCK_MS)
  }, [goTo, run, game.id, ecoGame])

  const begin = useCallback(() => {
    startRef.current = performance.now()
    goTo('playing')
    startClock()
  }, [goTo, startClock])

  const handleEcoDone = useCallback(
    (status) => {
      pausedRef.current += performance.now() - ecoStartRef.current
      eco.current.status = status
      goTo('playing')
      if (status === 'closed') {
        const r = run.bonus(ECO_BONUS)
        setHud({ score: r.score, combo: r.combo, multiplier: r.multiplier })
        flash('good', '✨ ¡ECO CERRADO!', ECO_BONUS)
      }
      startClock()
    },
    [goTo, run, flash, startClock],
  )

  const start = useCallback(() => {
    if (phaseRef.current !== 'intro') return
    let n = COUNTDOWN_FROM
    goTo('countdown')
    setCount(n)
    const tick = () => {
      n -= 1
      if (n > 0) {
        setCount(n)
        timers.current.count = setTimeout(tick, COUNTDOWN_STEP_MS)
      } else {
        begin()
      }
    }
    timers.current.count = setTimeout(tick, COUNTDOWN_STEP_MS)
  }, [goTo, begin])

  useEffect(() => {
    const t = timers.current
    phaseRef.current = 'intro' // (React en desarrollo monta dos veces: acá se "reinicia")
    return () => {
      clearTimeout(t.count)
      clearInterval(t.clock)
      phaseRef.current = 'stopped'
    }
  }, [])

  function handleQuit() {
    phaseRef.current = 'stopped'
    clearTimeout(timers.current.count)
    clearInterval(timers.current.clock)
    onQuit()
  }

  return (
    <div className="game-screen" data-game={game.id} data-phase={phase}>
      <GameHUD time={timeLeft} score={hud.score} level={level} onClose={handleQuit} />
      <ComboBadge combo={hud.combo} multiplier={hud.multiplier} />
      <FeedbackText feedback={feedback} />

      <div className="play-area">
        {phase === 'playing' && <GameComponent level={level} api={api} />}
      </div>

      {phase === 'playing' && <LevelBanner level={level} note={game.levelUpNote} />}
      {phase === 'eco' && <EcoMoment game={ecoGame} onDone={handleEcoDone} />}
      {phase === 'intro' && <HowToPlay game={game} mode={mode} ecoGame={ecoGame} onStart={start} />}
      {phase === 'countdown' && <Countdown count={count} />}
    </div>
  )
}

export default GameShell
