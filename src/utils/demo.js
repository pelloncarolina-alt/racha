// Modo demo: permite elegir qué juego toca hoy (o adelantar días) para mostrar todo sin esperar.
// Solo cambia QUÉ juego toca; lo que se juega cuenta como cualquier desafío del día.
const KEY = 'racha_demo_offset'

export function getDemoOffset() {
  try {
    return parseInt(window.localStorage.getItem(KEY), 10) || 0
  } catch {
    return 0
  }
}

export function setDemoOffset(n) {
  try {
    if (n === 0) window.localStorage.removeItem(KEY)
    else window.localStorage.setItem(KEY, String(n))
  } catch {
    // nada
  }
}
