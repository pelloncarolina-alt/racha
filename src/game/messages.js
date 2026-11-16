// Condiciones de victoria y derrota, y los mensajes de Racha para cada resultado.
//
// Regla: cada juego tiene una META en puntos (`game.goal`).
//  - Desafío del día: si llegás a la meta, ganás y sumás un día de racha. Si no, la llama
//    se apaga: no suma racha, pero podés reintentar el mismo día.
//  - Práctica: la meta es solo de referencia.

const WIN_DAILY = [
  { title: '¡RACHA ASEGURADA!', text: 'Hoy cumpliste el desafío y la llama sigue prendida.' },
  { title: '¡LA RACHA SIGUE!', text: 'Un día más en el tablero. Mañana te espera otro desafío.' },
  { title: '¡DESAFÍO CUMPLIDO!', text: 'Pasaste la meta de hoy. Así se mantiene una racha.' },
]

const LOSE_DAILY = [
  { title: 'SE APAGÓ LA LLAMA', text: 'No llegaste a la meta. Hoy todavía podés reintentar y salvar tu racha.' },
  { title: 'CASI, PERO NO', text: 'Te quedaste cerca. La racha espera: probá de nuevo.' },
  { title: 'LA LLAMA TIEMBLA', text: 'No alcanzó para sumar el día. Una más y la salvás.' },
]

const WIN_PRACTICE = [
  { title: '¡BUENA PARTIDA!', text: 'Pasaste la meta de este juego. Ya lo tenés dominado.' },
  { title: '¡ASÍ SE JUEGA!', text: 'Meta superada. Probá de mejorar tu récord.' },
]

const LOSE_PRACTICE = [
  { title: 'ESTUVO CERCA', text: 'No llegaste a la meta, pero practicando se mejora.' },
  { title: 'A LA PRÓXIMA', text: 'Cada partida te acerca. Probá otra vez.' },
]

const pick = (list, seed) => list[Math.abs(Math.round(seed)) % list.length]

export function outcomeOf(result, game, mode) {
  const goal = game.goal
  const won = result.score >= goal
  const daily = mode === 'daily'
  const pool = daily ? (won ? WIN_DAILY : LOSE_DAILY) : won ? WIN_PRACTICE : LOSE_PRACTICE
  const base = pick(pool, result.score)
  let text = base.text
  if (!won) text += ` Te faltaron ${(goal - result.score).toLocaleString('en-US')} puntos.`
  if (won && result.level >= 5) text += ' Y llegaste al nivel 5: no lo logra cualquiera.'
  return {
    won,
    goal,
    missing: Math.max(0, goal - result.score),
    title: base.title,
    text,
    emoji: won ? '🔥' : '🌫️',
    streakCounts: daily && won,
  }
}

// Mensaje del Eco según cómo terminó
export function ecoMessage(eco, bonus) {
  if (eco === 'closed') return `✨ Eco cerrado: +${bonus.toLocaleString('en-US')} puntos`
  if (eco === 'lost') return '🌫️ El Eco se desvaneció. Vuelve a aparecer mañana.'
  return ''
}
