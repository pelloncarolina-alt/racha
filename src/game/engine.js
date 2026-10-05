import {
  GAME_SECONDS,
  START_SCALE,
  GOOD_MS,
  GAP_MIN_MS,
  GAP_MAX_MS,
  STRAY_GRACE_MS,
} from './config.js'
import { gradeTap, multiplierFor, pointsFor, approachMs } from './scoring.js'

const COUNTDOWN_FROM = 3
const COUNTDOWN_STEP_MS = 800
const FIRST_PULSE_DELAY_MS = 700
const noop = () => {}

/**
 * Motor del desafío "Reflejos: El pulso neón".
 * No depende de React ni del navegador: recibe el reloj y los timers desde afuera,
 * así se puede probar simulando partidas completas.
 */
export function createEngine({
  now,
  raf,
  caf,
  setTimer,
  clearTimer,
  random = Math.random,
  on = {},
}) {
  const cb = {
    phase: noop, // 'intro' | 'countdown' | 'playing' | 'finished'
    count: noop, // 3, 2, 1
    time: noop, // segundos restantes
    score: noop, // { score, combo, multiplier }
    pulse: noop, // { visible, scale, opacity }
    feedback: noop, // { grade, points, multiplier, key }
    finish: noop, // resultado final
    ...on,
  }

  const endAfterMs = GAME_SECONDS * 1000

  let phase = 'intro'
  let startTime = 0
  let pulse = null // { spawnAt, duration }
  let nextSpawnAt = 0
  let lastResolveAt = -Infinity
  let score = 0
  let combo = 0
  let bestCombo = 0
  let lastSecond = GAME_SECONDS
  let rafId = null
  let timerId = null
  let feedbackKey = 0
  const stats = { perfect: 0, great: 0, good: 0, early: 0, late: 0, stray: 0, pulses: 0 }

  function setPhase(next) {
    phase = next
    cb.phase(next)
  }

  function start() {
    if (phase !== 'intro') return
    let n = COUNTDOWN_FROM
    setPhase('countdown')
    cb.count(n)
    const tick = () => {
      n -= 1
      if (n > 0) {
        cb.count(n)
        timerId = setTimer(tick, COUNTDOWN_STEP_MS)
      } else {
        begin()
      }
    }
    timerId = setTimer(tick, COUNTDOWN_STEP_MS)
  }

  function begin() {
    startTime = now()
    nextSpawnAt = startTime + FIRST_PULSE_DELAY_MS
    setPhase('playing')
    cb.time(GAME_SECONDS)
    rafId = raf(loop)
  }

  function emitFeedback(grade, points, multiplier) {
    feedbackKey += 1
    cb.feedback({ grade, points, multiplier, key: feedbackKey })
  }

  function resolve(grade, t) {
    const isHit = grade === 'perfect' || grade === 'great' || grade === 'good'
    const multiplier = multiplierFor(combo)
    let points = 0
    stats.pulses += 1

    if (isHit) {
      points = pointsFor(grade, combo)
      score += points
      combo += 1
      bestCombo = Math.max(bestCombo, combo)
      stats[grade] += 1
    } else {
      stats[grade] += 1 // 'early' o 'late'
      combo = 0
    }

    pulse = null
    lastResolveAt = t
    nextSpawnAt = t + GAP_MIN_MS + random() * (GAP_MAX_MS - GAP_MIN_MS)
    cb.pulse({ visible: false })
    cb.score({ score, combo, multiplier: multiplierFor(combo) })
    emitFeedback(grade, points, multiplier)
  }

  function loop() {
    if (phase !== 'playing') return
    const t = now()
    const elapsed = t - startTime

    if (elapsed >= endAfterMs) {
      finish()
      return
    }

    const remaining = Math.ceil((endAfterMs - elapsed) / 1000)
    if (remaining !== lastSecond) {
      lastSecond = remaining
      cb.time(remaining)
    }

    // Nace un pulso nuevo (solo si alcanza a llegar al aro antes de que termine la partida)
    if (!pulse && t >= nextSpawnAt) {
      const duration = approachMs(elapsed)
      if (t + duration <= startTime + endAfterMs) {
        pulse = { spawnAt: t, duration }
      } else {
        nextSpawnAt = Infinity
      }
    }

    if (pulse) {
      const target = pulse.spawnAt + pulse.duration
      if (t - target > GOOD_MS) {
        resolve('late', t) // nunca tocó
      } else {
        const progress = (t - pulse.spawnAt) / pulse.duration
        const scale = START_SCALE - (START_SCALE - 1) * progress
        const opacity =
          progress < 1 ? 0.25 + 0.75 * progress : 1 - 0.8 * ((t - target) / GOOD_MS)
        cb.pulse({ visible: true, scale, opacity })
      }
    }

    rafId = raf(loop)
  }

  function tap() {
    if (phase !== 'playing') return
    const t = now()
    if (t - startTime >= endAfterMs) return

    if (!pulse) {
      // Doble toque accidental: se ignora. Un toque suelto rompe el combo.
      if (t - lastResolveAt < STRAY_GRACE_MS) return
      stats.stray += 1
      combo = 0
      cb.score({ score, combo, multiplier: 1 })
      emitFeedback('stray', 0, 1)
      return
    }

    const error = t - (pulse.spawnAt + pulse.duration)
    const grade = error > GOOD_MS ? 'late' : gradeTap(error)
    resolve(grade, t)
  }

  function finish() {
    if (phase === 'finished') return
    if (rafId !== null) caf(rafId)
    if (timerId !== null) clearTimer(timerId)
    pulse = null
    cb.pulse({ visible: false })
    cb.time(0)
    setPhase('finished')
    const hits = stats.perfect + stats.great + stats.good
    cb.finish({
      score,
      bestCombo,
      stats: { ...stats },
      hits,
      pulses: stats.pulses,
      accuracy: stats.pulses ? Math.round((hits / stats.pulses) * 100) : 0,
    })
  }

  // Corta todo sin dar resultado (al salir del juego o desmontar la pantalla)
  function stop() {
    if (rafId !== null) caf(rafId)
    if (timerId !== null) clearTimer(timerId)
    rafId = null
    timerId = null
    phase = 'stopped'
  }

  function getState() {
    return {
      phase,
      score,
      combo,
      bestCombo,
      stats: { ...stats },
      pulseTarget: pulse ? pulse.spawnAt + pulse.duration : null,
      pulseSpawnAt: pulse ? pulse.spawnAt : null,
    }
  }

  return { start, tap, stop, getState }
}
