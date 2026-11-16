import { rampInt, ramp } from '../levels.js'

export const COLORS = [
  { id: 'rojo', name: 'ROJO', hex: '#ff5d73' },
  { id: 'azul', name: 'AZUL', hex: '#4da3ff' },
  { id: 'verde', name: 'VERDE', hex: '#4ade80' },
  { id: 'amarillo', name: 'AMARILLO', hex: '#ffd84d' },
  { id: 'violeta', name: 'VIOLETA', hex: '#b39dff' },
  { id: 'naranja', name: 'NARANJA', hex: '#ff9a3d' },
]

// Colores: la palabra dice un color pero está pintada de otro. Hay que tocar el color de la TINTA.
// Cada nivel: más colores para elegir, la palabra miente más seguido y hay menos tiempo.
export function coloresParams(level) {
  return {
    choices: rampInt(level, 3, 6),
    mismatch: Math.round(ramp(level, 0.35, 1) * 100) / 100,
    timeMs: rampInt(level, 4200, 1900),
  }
}

export function makeColorQuestion(level, random = Math.random) {
  const { choices, mismatch } = coloresParams(level)
  const pool = COLORS.slice(0, choices)
  const ink = pool[Math.floor(random() * pool.length)]
  let word = ink
  if (random() < mismatch) {
    const others = pool.filter((c) => c.id !== ink.id)
    word = others[Math.floor(random() * others.length)]
  }
  return { word, ink, options: pool }
}
