// Lógica de dificultad COMÚN a todos los juegos de Racha.
//
// Regla única: cada partida se divide en 5 niveles de igual duración.
// A medida que pasa el tiempo se sube de nivel y el juego se pone más difícil
// (más rápido, más chico, más para memorizar...). Cada juego decide QUÉ se
// endurece, pero siempre usando estas mismas funciones.

export const MAX_LEVEL = 5

// Nivel (1 a 5) según cuánto pasó de la partida
export function levelAt(elapsedMs, totalMs) {
  if (!(totalMs > 0) || elapsedMs <= 0) return 1
  const length = totalMs / MAX_LEVEL
  return Math.min(MAX_LEVEL, 1 + Math.floor(elapsedMs / length))
}

// Avance de dificultad: 0 en el nivel 1, 1 en el nivel 5
export function progress(level) {
  const clamped = Math.min(MAX_LEVEL, Math.max(1, level))
  return (clamped - 1) / (MAX_LEVEL - 1)
}

// Valor que va de `easy` (nivel 1) a `hard` (nivel 5). Sirve tanto si sube como si baja.
export function ramp(level, easy, hard) {
  return easy + (hard - easy) * progress(level)
}

export function rampInt(level, easy, hard) {
  return Math.round(ramp(level, easy, hard))
}
