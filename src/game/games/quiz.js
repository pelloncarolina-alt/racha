import { rampInt } from '../levels.js'
import { CULTURA } from '../banks/cultura.js'
import { CAPITALES } from '../banks/capitales.js'
import { VERDADERO } from '../banks/verdadero.js'

// Tipos de preguntas: cultura general, capitales y verdadero o falso.
// Cada nivel: las preguntas son más difíciles (nivel 1-2 fáciles, 3-4 medias, 5 difíciles)
// y hay menos tiempo para responder.

export function tierFor(level) {
  if (level <= 2) return 1
  if (level <= 4) return 2
  return 3
}

export const QUIZ_TIME_MS = {
  cultura: (level) => rampInt(level, 10000, 5500),
  capitales: (level) => rampInt(level, 8000, 4500),
  verdadero: (level) => rampInt(level, 5500, 2400),
}

export function shuffle(list, random = Math.random) {
  const arr = [...list]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

// Elige una pregunta del nivel de dificultad que toca, sin repetir las ya usadas.
// De vez en cuando mete una del nivel de al lado para que no sea tan previsible.
export function pickEntry(bank, level, used = new Set(), random = Math.random) {
  let tier = tierFor(level)
  const r = random()
  if (r < 0.15 && tier > 1) tier -= 1
  else if (r > 0.9 && tier < 3) tier += 1
  let pool = bank.filter((e, i) => e.tier === tier && !used.has(i))
  if (!pool.length) pool = bank.filter((e, i) => !used.has(i))
  if (!pool.length) {
    used.clear()
    pool = bank.filter((e) => e.tier === tier)
  }
  const entry = pool[Math.floor(random() * pool.length)]
  used.add(bank.indexOf(entry))
  return entry
}

// Preguntas listas para mostrar: { prompt, options:[{label, correct}] }
export function buildCultura(entry, random = Math.random) {
  return {
    prompt: entry.q,
    options: shuffle(
      [{ label: entry.a, correct: true }, ...entry.w.map((label) => ({ label, correct: false }))],
      random,
    ),
  }
}

export function buildCapital(entry, random = Math.random) {
  return {
    prompt: `¿Cuál es la capital de ${entry.country}?`,
    options: shuffle(
      [{ label: entry.capital, correct: true }, ...entry.w.map((label) => ({ label, correct: false }))],
      random,
    ),
  }
}

export function buildVerdadero(entry) {
  return {
    prompt: entry.t,
    options: [
      { label: 'VERDADERO', correct: entry.v === true },
      { label: 'FALSO', correct: entry.v === false },
    ],
  }
}

export const QUIZ_KINDS = {
  cultura: { bank: CULTURA, build: buildCultura },
  capitales: { bank: CAPITALES, build: buildCapital },
  verdadero: { bank: VERDADERO, build: buildVerdadero },
}

// Puntos: 100 base + hasta 60 extra según cuánto tiempo sobraba
export function quizPoints(timeLeftRatio) {
  return 100 + Math.round(60 * Math.min(1, Math.max(0, timeLeftRatio)))
}
