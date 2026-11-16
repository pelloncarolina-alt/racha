// Genera docs/DIFICULTAD.md: una tabla con lo que cambia en cada nivel de cada juego.
// Se corre con:  npm run dificultad
// Lee los parámetros reales del código, así la tabla nunca queda desactualizada.
import { writeFileSync } from 'node:fs'
import { GAMES } from '../src/game/catalog.js'
import { approachMs, gapRange } from '../src/game/scoring.js'
import { punteriaParams } from '../src/game/games/punteria.js'
import { toposParams } from '../src/game/games/topos.js'
import { coloresParams } from '../src/game/games/colores.js'
import { cuentasParams } from '../src/game/games/cuentas.js'
import { ordenParams } from '../src/game/games/orden.js'
import { secuenciaParams } from '../src/game/games/secuencia.js'
import { memotestParams } from '../src/game/games/memotest.js'
import { QUIZ_TIME_MS, tierFor } from '../src/game/games/quiz.js'
import { MAX_LEVEL } from '../src/game/levels.js'

const s = (ms) => `${(ms / 1000).toFixed(2).replace(/0$/, '').replace('.', ',')} s`
const tierName = { 1: 'fáciles', 2: 'medias', 3: 'difíciles' }

const rows = {
  reflejos: (l) => `El pulso tarda ${s(approachMs(l))} en llegar · pausa entre pulsos ${s(gapRange(l).min)} a ${s(gapRange(l).max)}`,
  punteria: (l) => { const p = punteriaParams(l); return `Blanco de ${p.sizePx} px · dura ${s(p.lifeMs)} · aparece cada ${s(p.gapMs)}` },
  topos: (l) => { const p = toposParams(l); return `Hasta ${p.maxActive} topo(s) a la vez · se queda ${s(p.upMs)} · sale cada ~${s(p.spawnMs)} · bombas ${Math.round(p.bombChance * 100)} %` },
  colores: (l) => { const p = coloresParams(l); return `${p.choices} colores · la palabra miente ${Math.round(p.mismatch * 100)} % de las veces · ${s(p.timeMs)} por pregunta` },
  cuentas: (l) => `${['Sumas hasta 12', 'Sumas y restas hasta 60', 'Tablas del 2 al 9', 'Tablas hasta 12 y restas de 2 cifras', 'Combinadas (a × b ± c)'][l - 1]} · ${s(cuentasParams(l).timeMs)} por cuenta`,
  orden: (l) => `${ordenParams(l).count} números por tablero${ordenParams(l).shuffleOnTap ? ' · se mezclan después de cada acierto' : ''}`,
  secuencia: (l) => `Cada luz dura ${s(secuenciaParams(l).stepMs)}`,
  memotest: (l) => { const p = memotestParams(l); return `${p.pairs} parejas (${p.pairs * 2} cartas) · las que no coinciden se tapan en ${s(p.hideMs)}` },
  cultura: (l) => `Preguntas ${tierName[tierFor(l)]} · ${s(QUIZ_TIME_MS.cultura(l))} para responder`,
  capitales: (l) => `Capitales ${tierName[tierFor(l)]} · ${s(QUIZ_TIME_MS.capitales(l))} para responder`,
  verdadero: (l) => `Afirmaciones ${tierName[tierFor(l)]} · ${s(QUIZ_TIME_MS.verdadero(l))} para decidir`,
}

let md = `# Dificultad por nivel

Todos los juegos de Racha usan **la misma lógica**: cada partida se divide en ${MAX_LEVEL} niveles de igual duración
(\`src/game/levels.js\`). Al pasar de nivel el juego se pone más difícil: más rápido, más chico, más para memorizar
o preguntas más complicadas. Cada juego decide **qué** se endurece en su archivo \`src/game/games/<juego>.js\`.

> Esta tabla se genera sola con \`npm run dificultad\`, leyendo los valores reales del código.

`
for (const game of GAMES) {
  md += `## ${game.icon} ${game.name} (${game.seconds} s)\n\n${game.hardens}\n\n| Nivel | Qué pasa |\n|---|---|\n`
  for (let l = 1; l <= MAX_LEVEL; l++) md += `| ${l} | ${rows[game.id](l)} |\n`
  md += '\n'
}
writeFileSync(new URL('../docs/DIFICULTAD.md', import.meta.url), md)
console.log('docs/DIFICULTAD.md generado')
