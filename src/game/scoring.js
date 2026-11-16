import {
  PERFECT_MS,
  GREAT_MS,
  GOOD_MS,
  POINTS,
  APPROACH_EASY_MS,
  APPROACH_HARD_MS,
  GAP_EASY_MS,
  GAP_HARD_MS,
  COMBO_STEP,
  MAX_MULTIPLIER,
  FRIENDS_RANKING,
} from './config.js'
import { ramp } from './levels.js'

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

// Cuánto tarda el pulso en llegar al aro en cada nivel (más rápido a medida que se sube)
export function approachMs(level) {
  return Math.round(ramp(level, APPROACH_EASY_MS, APPROACH_HARD_MS))
}

// Rango de pausa entre pulsos en cada nivel
export function gapRange(level) {
  return {
    min: Math.round(ramp(level, GAP_EASY_MS.min, GAP_HARD_MS.min)),
    max: Math.round(ramp(level, GAP_EASY_MS.max, GAP_HARD_MS.max)),
  }
}

// Ranking final: mete al jugador entre los amigos y ordena por puntaje
export function buildRanking(playerName, playerScore, friends) {
  return [...friends, { name: playerName, score: playerScore, isPlayer: true }]
    .sort((a, b) => b.score - a.score)
    .map((entry, index) => ({ ...entry, position: index + 1 }))
}

// Amigos de ejemplo con puntajes acordes a cada juego (hasta que haya servidor)
export function friendsFor(game) {
  return FRIENDS_RANKING.map((friend, i) => ({ name: friend.name, score: game.ghost[i] }))
}
