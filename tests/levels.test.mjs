import assert from 'node:assert/strict'
import { levelAt, progress, ramp, rampInt, MAX_LEVEL } from '../src/game/levels.js'
import { createRun } from '../src/game/run.js'

// 5 niveles de igual duración
assert.equal(MAX_LEVEL, 5)
assert.equal(levelAt(0, 45000), 1)
assert.equal(levelAt(8999, 45000), 1)
assert.equal(levelAt(9000, 45000), 2)
assert.equal(levelAt(36000, 45000), 5)
assert.equal(levelAt(45000, 45000), 5)
assert.equal(levelAt(999999, 45000), 5)
assert.equal(levelAt(-5, 45000), 1)
assert.equal(levelAt(30000, 60000), 3)

// rampas: suben o bajan entre el nivel 1 y el 5
assert.equal(progress(1), 0)
assert.equal(progress(5), 1)
assert.equal(ramp(1, 10, 20), 10)
assert.equal(ramp(5, 10, 20), 20)
assert.equal(ramp(3, 10, 20), 15)
assert.equal(ramp(5, 3000, 1000), 1000)
assert.equal(rampInt(2, 4, 8), 5)

// partida: puntaje, combo y nivel con reloj simulado
const run = createRun(60)
assert.deepEqual(run.tick(0), { level: 1, timeLeft: 60, finished: false })
assert.equal(run.hit(100).points, 100)
for (let i = 0; i < 3; i++) run.hit(100)
assert.equal(run.hit(100).points, 100) // 5º acierto: todavía x1
assert.equal(run.hit(100).points, 200) // 6º: ya con x2
run.miss()
assert.equal(run.state().combo, 0)
assert.equal(run.hit(100).points, 100)
assert.equal(run.tick(12000).level, 2)
assert.equal(run.tick(59000).timeLeft, 1)
const end = run.tick(60000)
assert.equal(end.finished, true)
const res = run.result('puntería')
assert.equal(res.gameId, 'puntería')
assert.equal(res.level, 5)
assert.equal(res.hits, 7)
assert.equal(res.misses, 1)
assert.equal(res.accuracy, 88)
assert.equal(res.bestCombo, 6)

console.log('OK: niveles y partida (run) funcionan bien')
