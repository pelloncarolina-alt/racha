import { useCallback, useEffect, useRef, useState } from 'react'
import { createEngine } from '../game/engine'
import { GAME_SECONDS } from '../game/config'

// Conecta el motor del juego con React.
// El pulso se mueve directo sobre el elemento (pulseRef) para que sea fluido;
// el resto (tiempo, puntaje, combo) va por estado.
export default function usePulseGame({ onFinish }) {
  const [phase, setPhase] = useState('intro') // intro | countdown | playing | finished
  const [count, setCount] = useState(3)
  const [timeLeft, setTimeLeft] = useState(GAME_SECONDS)
  const [hud, setHud] = useState({ score: 0, combo: 0, multiplier: 1 })
  const [feedback, setFeedback] = useState(null)

  const pulseRef = useRef(null)
  const engineRef = useRef(null)
  const finishRef = useRef(onFinish)

  useEffect(() => {
    finishRef.current = onFinish
  }, [onFinish])

  useEffect(() => {
    const engine = createEngine({
      now: () => performance.now(),
      raf: (fn) => requestAnimationFrame(fn),
      caf: (id) => cancelAnimationFrame(id),
      setTimer: (fn, ms) => setTimeout(fn, ms),
      clearTimer: (id) => clearTimeout(id),
      on: {
        phase: setPhase,
        count: setCount,
        time: setTimeLeft,
        score: setHud,
        feedback: setFeedback,
        pulse: ({ visible, scale, opacity }) => {
          const el = pulseRef.current
          if (!el) return
          if (!visible) {
            el.style.opacity = '0'
            return
          }
          el.style.opacity = String(opacity)
          el.style.transform = `scale(${scale})`
        },
        finish: (result) => finishRef.current(result),
      },
    })
    engineRef.current = engine
    return () => engine.stop()
  }, [])

  const start = useCallback(() => engineRef.current?.start(), [])
  const tap = useCallback(() => engineRef.current?.tap(), [])
  const quit = useCallback(() => engineRef.current?.stop(), [])

  return { phase, count, timeLeft, hud, feedback, pulseRef, start, tap, quit }
}
