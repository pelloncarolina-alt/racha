// El Eco: dentro del desafío de hoy aparece, por sorpresa, un fragmento del desafío de ayer.
// Hay que lograr ECO_HITS aciertos de esa mecánica antes de que se acaben ECO_SECONDS.
// Si lo cerrás, sumás puntos extra. Si no, el Eco se desvanece.

export const ECO_HITS = 3
export const ECO_SECONDS = 15
export const ECO_BONUS = 500
export const ECO_TRIGGER_LEVEL = 3 // aparece cuando la partida llega al nivel 3

export function createEcoChallenge() {
  let hits = 0
  let misses = 0
  return {
    hit() {
      hits += 1
    },
    miss() {
      misses += 1
    },
    // 'open' (sigue), 'closed' (lo resolvió) o 'lost' (se acabó el tiempo)
    status(elapsedMs) {
      if (hits >= ECO_HITS) return 'closed'
      if (elapsedMs >= ECO_SECONDS * 1000) return 'lost'
      return 'open'
    },
    get hits() {
      return hits
    },
    get misses() {
      return misses
    },
  }
}

// ¿Toca mostrar el Eco ahora? Solo una vez, en el desafío del día, al llegar al nivel 3
export function shouldTriggerEco({ hasEco, alreadyShown, level }) {
  return Boolean(hasEco) && !alreadyShown && level >= ECO_TRIGGER_LEVEL
}
