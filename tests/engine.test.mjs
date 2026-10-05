import assert from 'node:assert/strict'
import { createEngine } from '../src/game/engine.js'
import { GAME_SECONDS, GOOD_MS } from '../src/game/config.js'
import { pointsFor } from '../src/game/scoring.js'

// Reloj simulado: avanza de a 16ms (60 fps)
function makeWorld(seed = 1) {
  let time = 1000
  let rafCb = null
  const timers = []
  let s = seed
  const random = () => { s = (s * 16807) % 2147483647; return s / 2147483647 }
  const events = { pulses: [], feedback: [], finish: [], phases: [], times: [] }
  const engine = createEngine({
    now: () => time,
    raf: (fn) => { rafCb = fn; return 1 },
    caf: () => { rafCb = null },
    setTimer: (fn, ms) => { timers.push({ at: time + ms, fn }); return timers.length },
    clearTimer: () => {},
    random,
    on: {
      phase: (p) => events.phases.push(p),
      pulse: (p) => events.pulses.push(p),
      feedback: (f) => events.feedback.push(f),
      finish: (r) => events.finish.push(r),
      time: (t) => events.times.push(t),
    },
  })
  function step(ms = 16, botFn) {
    time += ms
    for (let i = timers.length - 1; i >= 0; i--) {
      if (timers[i].at <= time) { const t = timers.splice(i, 1)[0]; t.fn() }
    }
    if (botFn) botFn()
    if (rafCb) { const f = rafCb; rafCb = null; f() }
  }
  return { engine, events, step, now: () => time }
}

function runGame(bot, seed) {
  const w = makeWorld(seed)
  w.engine.start()
  let guard = 0
  while (w.engine.getState().phase !== 'finished' && guard++ < 20000) {
    w.step(16, () => bot(w))
  }
  return w
}

// 1) Jugador perfecto: toca en el primer frame en que el pulso llega al aro
{
  const w = runGame((w) => {
    const st = w.engine.getState()
    if (st.pulseTarget !== null && w.now() >= st.pulseTarget) w.engine.tap()
  }, 7)
  const r = w.events.finish[0]
  assert.equal(w.events.finish.length, 1, 'onFinish se llama una sola vez')
  assert.equal(r.stats.early + r.stats.late + r.stats.stray, 0, 'sin fallos')
  assert.equal(r.stats.perfect, r.hits, 'todos perfectos')
  assert.ok(r.hits >= 20, 'hubo una cantidad razonable de pulsos: ' + r.hits)
  assert.equal(r.accuracy, 100)
  assert.equal(r.bestCombo, r.hits)
  // el puntaje coincide con el cálculo independiente
  let expected = 0
  for (let c = 0; c < r.hits; c++) expected += pointsFor('perfect', c)
  assert.equal(r.score, expected)
  // nunca hay pulsos visibles al final
  assert.equal(w.events.pulses.at(-1).visible, false)
  // el timer llegó a 0 y bajó de a poco
  assert.equal(w.events.times[0], GAME_SECONDS)
  assert.equal(w.events.times.at(-1), 0)
  console.log(`  perfecto: ${r.hits} aciertos, combo ${r.bestCombo}, ${r.score} pts`)
}

// 2) Jugador que no toca nada: todo fallo por tarde, 0 puntos, termina igual
{
  const w = runGame(() => {}, 3)
  const r = w.events.finish[0]
  assert.equal(r.score, 0)
  assert.equal(r.hits, 0)
  assert.ok(r.stats.late >= 15)
  assert.equal(r.accuracy, 0)
  console.log(`  sin tocar: ${r.stats.late} pulsos perdidos, 0 pts`)
}

// 3) Jugador ansioso: toca apenas aparece el pulso -> fallos por temprano
{
  const w = runGame((w) => {
    const st = w.engine.getState()
    if (st.pulseSpawnAt !== null && w.now() - st.pulseSpawnAt >= 100) w.engine.tap()
  }, 5)
  const r = w.events.finish[0]
  assert.equal(r.score, 0)
  assert.ok(r.stats.early >= 15)
  console.log(`  ansioso: ${r.stats.early} toques tempranos, 0 pts`)
}

// 4) Los toques antes de empezar o después de terminar no hacen nada
{
  const w = makeWorld(2)
  w.engine.tap() // intro
  assert.equal(w.engine.getState().score, 0)
  assert.equal(w.events.feedback.length, 0)
  w.engine.start()
  w.engine.tap() // countdown
  assert.equal(w.events.feedback.length, 0)
}

// 5) Toque suelto rompe el combo; doble toque accidental se ignora
{
  const w = makeWorld(4)
  w.engine.start()
  let guard = 0
  // llegar a jugar
  while (w.engine.getState().phase !== 'playing' && guard++ < 1000) w.step(16)
  // esperar el primer pulso y acertarlo perfecto
  guard = 0
  while (w.engine.getState().pulseTarget === null && guard++ < 1000) w.step(16)
  while (w.now() < w.engine.getState().pulseTarget) w.step(16)
  w.engine.tap()
  assert.equal(w.engine.getState().combo, 1)
  const fbCount = w.events.feedback.length
  w.engine.tap() // doble toque inmediato -> ignorado
  assert.equal(w.events.feedback.length, fbCount)
  assert.equal(w.engine.getState().combo, 1)
  // esperar a que pase la ventana de gracia (sin que aparezca un pulso) y tocar suelto
  w.step(160)
  if (w.engine.getState().pulseTarget === null) {
    w.engine.tap()
    assert.equal(w.engine.getState().combo, 0)
    assert.equal(w.engine.getState().stats.stray, 1)
    assert.equal(w.events.feedback.at(-1).grade, 'stray')
  }
}

// 6) Toque tarde (justo antes de que el loop lo detecte) cuenta como 'late'
{
  const w = makeWorld(9)
  w.engine.start()
  let guard = 0
  while (w.engine.getState().pulseTarget === null && guard++ < 2000) w.step(16)
  const target = w.engine.getState().pulseTarget
  while (w.now() < target + GOOD_MS + 5) w.step(1)   // sin que el loop corra a tiempo
  const st = w.engine.getState()
  // o ya fue resuelto por el loop, o el toque lo marca como late
  if (st.pulseTarget !== null) { w.engine.tap() }
  assert.equal(w.engine.getState().stats.late, 1)
  assert.equal(w.engine.getState().score, 0)
}

// 7) stop() corta todo: no se llama onFinish
{
  const w = makeWorld(6)
  w.engine.start()
  for (let i = 0; i < 200; i++) w.step(16)
  w.engine.stop()
  for (let i = 0; i < 5000; i++) w.step(16)
  assert.equal(w.events.finish.length, 0)
}

// 8) Varias partidas con distintos "azares" siempre terminan bien y en ~45s
for (const seed of [11, 22, 33, 44, 55]) {
  const w = runGame((w) => {
    const st = w.engine.getState()
    if (st.pulseTarget !== null && w.now() >= st.pulseTarget + 40) w.engine.tap()
  }, seed)
  const r = w.events.finish[0]
  assert.equal(w.events.finish.length, 1)
  assert.ok(r.score > 0)
}
console.log('OK: el motor del juego pasa todas las pruebas')
