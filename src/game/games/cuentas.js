import { rampInt } from '../levels.js'

// Cuentas: cálculo mental con 4 opciones.
// Cada nivel: cuentas más difíciles (sumas → restas → tablas → combinadas) y menos tiempo.
export function cuentasParams(level) {
  return { timeMs: rampInt(level, 7000, 3800) }
}

const int = (random, min, max) => min + Math.floor(random() * (max - min + 1))

export function makeMathQuestion(level, random = Math.random) {
  let text
  let answer
  if (level <= 1) {
    const a = int(random, 2, 12)
    const b = int(random, 2, 12)
    text = `${a} + ${b}`
    answer = a + b
  } else if (level === 2) {
    if (random() < 0.5) {
      const a = int(random, 10, 40)
      const b = int(random, 5, 30)
      text = `${a} + ${b}`
      answer = a + b
    } else {
      const a = int(random, 20, 60)
      const b = int(random, 3, a - 1)
      text = `${a} − ${b}`
      answer = a - b
    }
  } else if (level === 3) {
    const a = int(random, 2, 9)
    const b = int(random, 2, 9)
    text = `${a} × ${b}`
    answer = a * b
  } else if (level === 4) {
    if (random() < 0.5) {
      const a = int(random, 6, 12)
      const b = int(random, 6, 12)
      text = `${a} × ${b}`
      answer = a * b
    } else {
      const a = int(random, 40, 99)
      const b = int(random, 15, 39)
      text = `${a} − ${b}`
      answer = a - b
    }
  } else {
    const a = int(random, 3, 9)
    const b = int(random, 3, 9)
    if (random() < 0.5) {
      const c = int(random, 2, 20)
      text = `${a} × ${b} + ${c}`
      answer = a * b + c
    } else {
      const c = int(random, 2, Math.min(20, a * b - 1)) // que nunca dé negativo
      text = `${a} × ${b} − ${c}`
      answer = a * b - c
    }
  }
  return { text, answer, options: makeOptions(answer, random) }
}

// 4 opciones distintas, todas parecidas a la correcta (±1, ±2, ±10...)
export function makeOptions(answer, random = Math.random) {
  const set = new Set([answer])
  const deltas = [-10, -2, -1, 1, 2, 10, 3, -3]
  let guard = 0
  while (set.size < 4 && guard++ < 50) {
    const d = deltas[Math.floor(random() * deltas.length)]
    const v = answer + d
    if (v >= 0) set.add(v)
  }
  let extra = 4
  while (set.size < 4) set.add(answer + extra++)
  const arr = [...set]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}
