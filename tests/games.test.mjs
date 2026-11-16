import assert from 'node:assert/strict'
import { GAMES, getGame, CATEGORIES } from '../src/game/catalog.js'
import { dailyGame, yesterdayGame, dayNumber } from '../src/game/daily.js'
import { punteriaParams, punteriaPoints, randomSpot } from '../src/game/games/punteria.js'
import { toposParams, pickHole, pickKind, HOLES } from '../src/game/games/topos.js'
import { coloresParams, makeColorQuestion, COLORS } from '../src/game/games/colores.js'
import { cuentasParams, makeMathQuestion, makeOptions } from '../src/game/games/cuentas.js'
import { ordenParams, makeBoard, COLS, ROWS } from '../src/game/games/orden.js'
import { secuenciaParams, newSequence, nextSequence, PADS } from '../src/game/games/secuencia.js'
import { memotestParams, makeDeck, EMOJIS } from '../src/game/games/memotest.js'
import { tierFor, pickEntry, QUIZ_TIME_MS, QUIZ_KINDS, quizPoints } from '../src/game/games/quiz.js'
import { CULTURA } from '../src/game/banks/cultura.js'
import { CAPITALES } from '../src/game/banks/capitales.js'
import { VERDADERO } from '../src/game/banks/verdadero.js'

let seed = 42
const random = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647 }
const L = [1, 2, 3, 4, 5]
const increasing = (fn) => L.slice(1).every((l) => fn(l) > fn(l - 1))
const decreasing = (fn) => L.slice(1).every((l) => fn(l) < fn(l - 1))

// ---- Catálogo: 11 juegos, ids únicos, datos completos ----
assert.equal(GAMES.length, 11)
assert.equal(new Set(GAMES.map((g) => g.id)).size, 11)
for (const g of GAMES) {
  assert.ok(CATEGORIES[g.category], g.id + ': categoría válida')
  assert.ok(g.name && g.icon && g.tagline && g.hardens && g.levelUpNote, g.id + ': textos')
  assert.equal(g.steps.length, 3, g.id + ': tres pasos')
  assert.ok(g.seconds >= 30 && g.seconds <= 90)
  assert.equal(g.ghost.length, 3)
  assert.ok(g.ghost[0] > g.ghost[1] && g.ghost[1] > g.ghost[2])
}
assert.equal(getGame('memotest').name, 'Memotest')
assert.equal(getGame('nada'), null)

// ---- Desafío del día: rota por todo el catálogo y nunca repite dos días seguidos ----
{
  const seen = new Set()
  let prev = null
  for (let i = 0; i < 44; i++) {
    const d = new Date(2026, 9, 1 + i)
    const g = dailyGame(d)
    assert.notEqual(g.id, prev, 'no repite el juego de ayer')
    assert.equal(yesterdayGame(d).id, prev ?? yesterdayGame(d).id)
    prev = g.id
    seen.add(g.id)
  }
  assert.equal(seen.size, 11, 'pasan todos los juegos')
  assert.equal(dayNumber(new Date(2026, 9, 27)) - dayNumber(new Date(2026, 9, 26)), 1)
}

// ---- Cada juego se pone más difícil con el nivel ----
assert.ok(decreasing((l) => punteriaParams(l).sizePx), 'puntería: blancos más chicos')
assert.ok(decreasing((l) => punteriaParams(l).lifeMs), 'puntería: duran menos')
assert.ok(decreasing((l) => punteriaParams(l).gapMs), 'puntería: salen más seguido')
assert.ok(increasing((l) => toposParams(l).maxActive) || toposParams(5).maxActive > toposParams(1).maxActive)
assert.ok(decreasing((l) => toposParams(l).upMs), 'topos: se quedan menos')
assert.ok(decreasing((l) => toposParams(l).spawnMs), 'topos: salen más rápido')
assert.equal(toposParams(1).bombChance, 0)
assert.equal(toposParams(2).bombChance, 0)
assert.ok(toposParams(3).bombChance === 0 || toposParams(3).bombChance >= 0)
assert.ok(toposParams(4).bombChance > 0 && toposParams(5).bombChance > toposParams(4).bombChance)
assert.ok(decreasing((l) => coloresParams(l).timeMs), 'colores: menos tiempo')
assert.ok(coloresParams(5).choices > coloresParams(1).choices)
assert.ok(coloresParams(5).mismatch > coloresParams(1).mismatch)
assert.ok(decreasing((l) => cuentasParams(l).timeMs), 'cuentas: menos tiempo')
assert.ok(increasing((l) => ordenParams(l).count), 'orden: más números')
assert.equal(ordenParams(4).shuffleOnTap, false)
assert.equal(ordenParams(5).shuffleOnTap, true)
assert.ok(decreasing((l) => secuenciaParams(l).stepMs), 'secuencia: más rápida')
assert.ok(memotestParams(5).pairs > memotestParams(1).pairs, 'memotest: más pares')
assert.ok(decreasing((l) => memotestParams(l).hideMs), 'memotest: se tapan más rápido')
for (const k of ['cultura', 'capitales', 'verdadero']) {
  assert.ok(decreasing((l) => QUIZ_TIME_MS[k](l)), k + ': menos tiempo')
}
assert.deepEqual(L.map(tierFor), [1, 1, 2, 2, 3])

// ---- Puntería ----
for (let i = 0; i < 200; i++) {
  const s = randomSpot(random)
  assert.ok(s.x >= 10 && s.x <= 90 && s.y >= 10 && s.y <= 90)
}
assert.equal(punteriaPoints(0), 100)
assert.equal(punteriaPoints(1), 160)
assert.equal(punteriaPoints(5), 160)

// ---- Topos ----
assert.equal(pickHole([0, 1, 2, 3, 4, 5, 6, 7, 8]), null)
for (let i = 0; i < 100; i++) {
  const occ = [0, 3, 5]
  const h = pickHole(occ, random)
  assert.ok(h >= 0 && h < HOLES && !occ.includes(h))
}
assert.equal(pickKind(1, random), 'mole')
{
  let bombs = 0
  for (let i = 0; i < 2000; i++) if (pickKind(5, random) === 'bomb') bombs++
  assert.ok(bombs > 400 && bombs < 700, 'bombas en nivel 5: ' + bombs)
}

// ---- Colores ----
for (const l of L) {
  for (let i = 0; i < 100; i++) {
    const q = makeColorQuestion(l, random)
    assert.equal(q.options.length, coloresParams(l).choices)
    assert.ok(q.options.some((c) => c.id === q.ink.id), 'la tinta está entre las opciones')
    assert.ok(q.options.some((c) => c.id === q.word.id))
    if (l === 5) assert.notEqual(q.word.id, q.ink.id, 'en el nivel 5 la palabra siempre miente')
  }
}
assert.equal(COLORS.length, 6)

// ---- Cuentas: la respuesta correcta siempre es correcta y está entre 4 opciones distintas ----
function evalText(text) {
  return Function('"use strict"; return (' + text.replace(/×/g, '*').replace(/−/g, '-') + ')')()
}
for (const l of L) {
  for (let i = 0; i < 300; i++) {
    const q = makeMathQuestion(l, random)
    assert.equal(evalText(q.text), q.answer, `${q.text} = ${q.answer}`)
    assert.equal(q.options.length, 4)
    assert.equal(new Set(q.options).size, 4, 'opciones distintas: ' + q.options)
    assert.ok(q.options.includes(q.answer))
    assert.ok(q.options.every((o) => Number.isInteger(o) && o >= 0))
    assert.ok(q.answer >= 0)
  }
}
assert.equal(new Set(makeOptions(0, random)).size, 4)

// ---- Orden ----
for (const l of L) {
  const { count } = ordenParams(l)
  const board = makeBoard(count, random)
  assert.equal(board.length, count)
  assert.equal(new Set(board).size, count, 'casilleros distintos')
  assert.ok(board.every((c) => c >= 0 && c < COLS * ROWS))
}
assert.ok(ordenParams(5).count <= COLS * ROWS)

// ---- Secuencia ----
{
  const s = newSequence(5, random)
  assert.equal(s.length, 5)
  assert.ok(s.every((p) => p >= 0 && p < PADS))
  assert.equal(nextSequence(s, random).length, 6)
  assert.deepEqual(nextSequence(s, random).slice(0, 5), s)
}

// ---- Memotest ----
for (const l of L) {
  const { pairs, cols } = memotestParams(l)
  const deck = makeDeck(pairs, random)
  assert.equal(deck.length, pairs * 2)
  assert.equal((pairs * 2) % cols, 0, 'el tablero queda rectangular')
  const count = {}
  deck.forEach((c) => { count[c.face] = (count[c.face] || 0) + 1 })
  assert.ok(Object.values(count).every((n) => n === 2), 'cada carta aparece 2 veces')
  assert.equal(new Set(deck.map((c) => c.id)).size, deck.length)
}
assert.ok(memotestParams(5).pairs <= EMOJIS.length)

// ---- Bancos de preguntas ----
function checkTiers(bank, name) {
  for (const t of [1, 2, 3]) assert.ok(bank.filter((e) => e.tier === t).length >= 10, `${name}: al menos 10 de nivel ${t}`)
}
checkTiers(CULTURA, 'cultura')
checkTiers(CAPITALES, 'capitales')
checkTiers(VERDADERO, 'verdadero')
for (const e of CULTURA) {
  assert.equal(e.w.length, 3, e.q)
  const all = [e.a, ...e.w]
  assert.equal(new Set(all).size, 4, 'opciones únicas: ' + e.q)
  assert.ok(e.q.trim().endsWith('?'))
}
assert.equal(new Set(CULTURA.map((e) => e.q)).size, CULTURA.length, 'sin preguntas repetidas')
for (const e of CAPITALES) {
  assert.equal(new Set([e.capital, ...e.w]).size, 4, e.country)
  assert.ok(!e.w.includes(e.capital))
}
assert.equal(new Set(CAPITALES.map((e) => e.country)).size, CAPITALES.length)
assert.equal(new Set(VERDADERO.map((e) => e.t)).size, VERDADERO.length)
assert.ok(VERDADERO.filter((e) => e.v).length >= 12 && VERDADERO.filter((e) => !e.v).length >= 12, 'hay verdaderas y falsas')
for (const e of VERDADERO) for (const t of [1, 2, 3]) if (e.tier === t) assert.equal(typeof e.v, 'boolean')

// ---- Preguntas armadas: siempre hay UNA sola correcta ----
for (const [kind, { bank, build }] of Object.entries(QUIZ_KINDS)) {
  const used = new Set()
  const tiers = {}
  for (let i = 0; i < 40; i++) {
    const level = 1 + (i % 5)
    const entry = pickEntry(bank, level, used, random)
    const q = build(entry, random)
    assert.equal(q.options.filter((o) => o.correct).length, 1, kind + ': una correcta')
    assert.ok(q.prompt)
    tiers[level] = tiers[level] || []
    tiers[level].push(entry.tier)
  }
  const avg = (a) => a.reduce((x, y) => x + y, 0) / a.length
  assert.ok(avg(tiers[5]) > avg(tiers[1]), kind + ': el nivel 5 trae preguntas más difíciles')
}
// no repite preguntas hasta agotar el banco
{
  const used = new Set()
  const seen = new Set()
  for (let i = 0; i < CULTURA.length; i++) {
    const e = pickEntry(CULTURA, 1 + (i % 5), used, random)
    assert.ok(!seen.has(e.q), 'repitió: ' + e.q)
    seen.add(e.q)
  }
  assert.equal(seen.size, CULTURA.length)
}
assert.equal(quizPoints(0), 100)
assert.equal(quizPoints(1), 160)

console.log('OK: 11 juegos, dificultad por nivel, generadores y bancos de preguntas')
