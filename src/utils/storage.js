import { dateKey, daysAgoKey } from './dates.js'

const STORAGE_KEY = 'racha_user'

// Todo va dentro de try/catch: si el navegador bloquea el guardado, el juego sigue funcionando
export function loadUser() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
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
    played: 0,
    history: [], // días en los que completó el desafío
  }
}

export function hasPlayedToday(user) {
  return user.history.includes(dateKey())
}

// Registra un desafío completado: actualiza racha, mejor puntaje e historial
export function registerResult(user, score) {
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
    played: user.played + 1,
    history: alreadyToday ? user.history : [...user.history, today],
  }
}
