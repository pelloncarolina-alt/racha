import { dateKey, daysAgoKey } from './dates.js'

const STORAGE_KEY = 'racha_user'

// Todo va dentro de try/catch: si el navegador bloquea el guardado, el juego sigue funcionando
export function loadUser() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    // `bests` (récord por juego) no existía en las cuentas viejas: se completa al leer
    return raw ? { bests: {}, ecos: 0, ...JSON.parse(raw) } : null
  } catch {
    return null
  }
}

export function saveUser(user) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
  } catch {
    // sin guardado: seguimos igual
  }
}

export function clearUser() {
  try {
    window.localStorage.removeItem(STORAGE_KEY)
  } catch {
    // nada
  }
}

// Usuario nuevo. La contraseña NO se guarda (por ahora el registro es una simulación).
export function createUser({ username, email, avatar }) {
  return {
    username,
    email,
    avatar,
    streak: 0,
    bestScore: 0,
    bests: {}, // mejor puntaje por juego: { punteria: 1200, ... }
    ecos: 0, // Ecos cerrados
    played: 0,
    history: [], // días en los que completó el desafío
  }
}

export function hasPlayedToday(user) {
  return user.history.includes(dateKey())
}

// Registra un desafío completado: actualiza racha, mejor puntaje e historial
export function registerResult(user, score, gameId) {
  const today = dateKey()
  const yesterday = daysAgoKey(1)
  const alreadyToday = user.history.includes(today)

  let streak = user.streak
  if (!alreadyToday) {
    streak = user.history.includes(yesterday) ? user.streak + 1 : 1
  }

  return {
    ...user,
    streak,
    bestScore: Math.max(user.bestScore, score),
    bests: withBest(user.bests, gameId, score),
    played: user.played + 1,
    history: alreadyToday ? user.history : [...user.history, today],
  }
}

// Partida de práctica (cualquier juego fuera del desafío del día): no toca la racha
export function registerPractice(user, gameId, score) {
  return {
    ...user,
    bestScore: Math.max(user.bestScore, score),
    bests: withBest(user.bests, gameId, score),
    played: user.played + 1,
  }
}

function withBest(bests = {}, gameId, score) {
  if (!gameId) return bests
  return { ...bests, [gameId]: Math.max(bests[gameId] || 0, score) }
}
