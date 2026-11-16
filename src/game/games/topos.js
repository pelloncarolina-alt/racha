import { rampInt, ramp } from '../levels.js'

export const HOLES = 9

// Topos: salen de las cuevas, hay que tocarlos. A partir del nivel 3 aparecen bombas.
// Cada nivel: más topos a la vez, se quedan menos tiempo y salen más rápido.
export function toposParams(level) {
  return {
    maxActive: rampInt(level, 1, 3),
    upMs: rampInt(level, 1200, 560),
    spawnMs: rampInt(level, 800, 320),
    bombChance: level >= 3 ? Math.round(ramp(level, 0, 0.28) * 100) / 100 : 0,
  }
}

// Elige una cueva libre al azar (o null si están todas ocupadas)
export function pickHole(occupied, random = Math.random) {
  const free = []
  for (let i = 0; i < HOLES; i++) if (!occupied.includes(i)) free.push(i)
  if (!free.length) return null
  return free[Math.floor(random() * free.length)]
}

export function pickKind(level, random = Math.random) {
  return random() < toposParams(level).bombChance ? 'bomb' : 'mole'
}
