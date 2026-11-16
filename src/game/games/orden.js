import { rampInt } from '../levels.js'

export const COLS = 4
export const ROWS = 5

// Orden: números desparramados, hay que tocarlos del 1 al último.
// Cada nivel: más números y, en el nivel 5, ¡se mezclan de lugar después de cada acierto!
export function ordenParams(level) {
  return {
    count: rampInt(level, 5, 15),
    shuffleOnTap: level >= 5,
  }
}

// Devuelve, para cada número 1..count, en qué casillero (0..19) está
export function makeBoard(count, random = Math.random) {
  const cells = Array.from({ length: COLS * ROWS }, (_, i) => i)
  for (let i = cells.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[cells[i], cells[j]] = [cells[j], cells[i]]
  }
  return cells.slice(0, count) // cells[0] es el casillero del número 1
}
