import { GAMES } from './catalog.js'
import { getDemoOffset } from '../utils/demo.js'

// Número de día (días desde 1970, con la fecha LOCAL del jugador)
export function dayNumber(date = new Date()) {
  return Math.floor(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86400000)
}

// El desafío del día: va rotando por todo el catálogo, así cada día cambia la mecánica
// y dos días seguidos nunca repiten el juego.
export function dailyGame(date = new Date()) {
  return GAMES[(dayNumber(date) + getDemoOffset()) % GAMES.length]
}

export function yesterdayGame(date = new Date()) {
  const d = new Date(date)
  d.setDate(d.getDate() - 1)
  return dailyGame(d)
}

// Modo demo: cuánto hay que adelantar el calendario para que HOY toque justo este juego.
export function offsetFor(gameId, date = new Date()) {
  const idx = GAMES.findIndex((g) => g.id === gameId)
  const n = GAMES.length
  return (((idx - (dayNumber(date) % n)) % n) + n) % n
}
