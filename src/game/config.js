// Configuración del desafío "Reflejos: El pulso neón"

export const GAME_SECONDS = 45 // duración de la partida
export const START_SCALE = 1.4 // tamaño inicial del pulso respecto del aro

// Margen de error (en milisegundos) alrededor del momento exacto
export const PERFECT_MS = 70
export const GREAT_MS = 140
export const GOOD_MS = 230

// Puntos base por precisión
export const POINTS = { perfect: 100, great: 60, good: 30 }

// Tiempo que tarda el pulso en llegar al aro: en el nivel 1 es lento, en el nivel 5 es muy rápido
export const APPROACH_EASY_MS = 1500
export const APPROACH_HARD_MS = 720

// Toques accidentales justo después de resolver un pulso (doble toque) se ignoran
export const STRAY_GRACE_MS = 150

// Pausa entre un pulso y el siguiente (también se achica con los niveles)
export const GAP_EASY_MS = { min: 350, max: 800 }
export const GAP_HARD_MS = { min: 160, max: 380 }

// Combo: cada 5 aciertos seguidos sube el multiplicador (máximo x3)
export const COMBO_STEP = 5
export const MAX_MULTIPLIER = 3

// Amigos de ejemplo para la clasificación final
export const FRIENDS_RANKING = [
  { name: '@pro_gamer99', score: 4250 },
  { name: '@speed_runner', score: 890 },
  { name: '@chill_vibes', score: 120 },
]
