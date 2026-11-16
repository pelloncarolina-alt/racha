import { rampInt } from '../levels.js'

export const PADS = 4

// Secuencia: mirá la secuencia de luces y repetila.
// Cada nivel: la secuencia se muestra más rápido (y no te da respiro).
export function secuenciaParams(level) {
  return { stepMs: rampInt(level, 720, 300) }
}

export function nextSequence(seq, random = Math.random) {
  return [...seq, Math.floor(random() * PADS)]
}

export function newSequence(length, random = Math.random) {
  let seq = []
  for (let i = 0; i < length; i++) seq = nextSequence(seq, random)
  return seq
}
