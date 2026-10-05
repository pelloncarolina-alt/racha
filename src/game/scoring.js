import {
  PERFECT_MS,
  GREAT_MS,
  GOOD_MS,
  POINTS,
  APPROACH_START_MS,
  APPROACH_END_MS,
  COMBO_STEP,
  MAX_MULTIPLIER,
  GAME_SECONDS,
} from './config.js'

// errorMs = momento del toque - momento exacto en que el pulso llega al aro
// (negativo = tocaste antes, positivo = tocaste después)
export function gradeTap(errorMs) {
  const abs = Math.abs(errorMs)
  if (abs <= PERFECT_MS) return 'perfect'
  if (abs <= GREAT_MS) return 'great'
  if (abs <= GOOD_MS) return 'good'
  return errorMs < 0 ? 'early' : 'late' // demasiado pronto / demasiado tarde
}

// Multiplicador según los aciertos seguidos que llevabas antes de este toque
export function multiplierFor(combo) {
  return Math.min(MAX_MULTIPLIER, 1 + Math.floor(combo / COMBO_STEP))
}

// Puntos que suma un toque (0 si fue un fallo)
export function pointsFor(grade, combo) {
  if (!POINTS[grade]) return 0
  return POINTS[grade] * multiplierFor(combo)
}

// Cuánto tarda el pulso en llegar al aro según cuánto avanzó la partida
export function approachMs(elapsedMs) {
  const ratio = Math.min(1, Math.max(0, elapsedMs / (GAME_SECONDS * 1000)))
  return APPROACH_START_MS + (APPROACH_END_MS - APPROACH_START_MS) * ratio
}

// Ranking final: mete al jugador entre los amigos y ordena por puntaje
export function buildRanking(playerName, playerScore, friends) {
  return [...friends, { name: playerName, score: playerScore, isPlayer: true }]
    .sort((a, b) => b.score - a.score)
    .map((entry, index) => ({ ...entry, position: index + 1 }))
}
