import { rampInt } from '../levels.js'

export const EMOJIS = ['🍕', '🚀', '🎸', '🦊', '🌵', '⚽', '🎲', '🍉', '🐙', '🔥', '🎧', '🌈']

const PAIRS_BY_LEVEL = [3, 4, 6, 6, 8]
const COLS_BY_LEVEL = [3, 4, 4, 4, 4]

// Memotest: dar vuelta las cartas y encontrar las parejas.
// Cada nivel: tableros más grandes y las cartas que no coinciden se tapan más rápido.
export function memotestParams(level) {
  const i = Math.min(5, Math.max(1, level)) - 1
  return {
    pairs: PAIRS_BY_LEVEL[i],
    cols: COLS_BY_LEVEL[i],
    hideMs: rampInt(level, 950, 420),
  }
}

export function makeDeck(pairs, random = Math.random) {
  const faces = [...EMOJIS]
  for (let i = faces.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[faces[i], faces[j]] = [faces[j], faces[i]]
  }
  const cards = faces.slice(0, pairs).flatMap((face, n) => [
    { id: `${n}a`, face },
    { id: `${n}b`, face },
  ])
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[cards[i], cards[j]] = [cards[j], cards[i]]
  }
  return cards
}
