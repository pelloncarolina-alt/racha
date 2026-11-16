import { rampInt } from '../levels.js'

// Puntería: aparecen blancos, hay que tocarlos antes de que se vayan.
// Cada nivel: blancos más chicos, que duran menos y aparecen más seguido.
export function punteriaParams(level) {
  return {
    sizePx: rampInt(level, 76, 36), // diámetro del blanco
    lifeMs: rampInt(level, 1700, 820), // cuánto tiempo queda en pantalla
    gapMs: rampInt(level, 450, 140), // pausa antes del próximo
  }
}

// Posición del blanco en % dentro de la cancha, con margen para que no quede cortado
export function randomSpot(random = Math.random) {
  return { x: 10 + random() * 80, y: 10 + random() * 80 }
}

// Puntos: base 100 + hasta 60 extra por tocar rápido
export function punteriaPoints(lifeLeftRatio) {
  return 100 + Math.round(60 * Math.min(1, Math.max(0, lifeLeftRatio)))
}
