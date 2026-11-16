import { levelAt } from './levels.js'
import { multiplierFor } from './scoring.js'

/**
 * Una partida de cualquiera de los juegos nuevos: puntaje, combo, aciertos, nivel y reloj.
 * No depende de React ni del navegador, así se puede probar con un reloj simulado.
 */
export function createRun(seconds) {
  const totalMs = seconds * 1000
  let score = 0
  let combo = 0
  let bestCombo = 0
  let hits = 0
  let misses = 0
  let level = 1
  let maxLevel = 1

  function snapshot() {
    return { score, combo, multiplier: multiplierFor(combo), level }
  }

  return {
    totalMs,

    // Se llama seguido con el tiempo transcurrido; devuelve nivel y segundos que faltan
    tick(elapsedMs) {
      level = levelAt(elapsedMs, totalMs)
      maxLevel = Math.max(maxLevel, level)
      return {
        level,
        timeLeft: Math.max(0, Math.ceil((totalMs - elapsedMs) / 1000)),
        finished: elapsedMs >= totalMs,
      }
    },

    // Acierto: suma puntos base × multiplicador de combo
    hit(basePoints) {
      const multiplier = multiplierFor(combo)
      const points = Math.round(basePoints * multiplier)
      score += points
      combo += 1
      hits += 1
      bestCombo = Math.max(bestCombo, combo)
      return { ...snapshot(), points }
    },

    // Puntos extra que no dependen del combo (por ejemplo, cerrar el Eco)
    bonus(points) {
      score += points
      return { ...snapshot(), points }
    },

    // Fallo: corta el combo
    miss() {
      combo = 0
      misses += 1
      return { ...snapshot(), points: 0 }
    },

    state: snapshot,

    result(gameId) {
      const attempts = hits + misses
      return {
        gameId,
        score,
        bestCombo,
        hits,
        misses,
        attempts,
        accuracy: attempts ? Math.round((hits / attempts) * 100) : 0,
        level: maxLevel,
      }
    },
  }
}
