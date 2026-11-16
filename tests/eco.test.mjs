import assert from 'node:assert/strict'
import { createEcoChallenge, shouldTriggerEco, ECO_HITS, ECO_SECONDS, ECO_BONUS, ECO_TRIGGER_LEVEL } from '../src/game/eco.js'
import { createRun } from '../src/game/run.js'

// se cierra con 3 aciertos a tiempo (los fallos no restan)
{
  const e = createEcoChallenge()
  assert.equal(e.status(0), 'open')
  e.hit(); e.miss(); e.hit()
  assert.equal(e.status(5000), 'open')
  e.hit()
  assert.equal(e.status(9000), 'closed')
  assert.equal(e.hits, ECO_HITS)
  assert.equal(e.misses, 1)
}
// se pierde si se acaba el tiempo
{
  const e = createEcoChallenge()
  e.hit()
  assert.equal(e.status(ECO_SECONDS * 1000 - 1), 'open')
  assert.equal(e.status(ECO_SECONDS * 1000), 'lost')
}
// aparece una sola vez, solo si hay Eco, y recién en el nivel 3
assert.equal(shouldTriggerEco({ hasEco: true, alreadyShown: false, level: ECO_TRIGGER_LEVEL - 1 }), false)
assert.equal(shouldTriggerEco({ hasEco: true, alreadyShown: false, level: ECO_TRIGGER_LEVEL }), true)
assert.equal(shouldTriggerEco({ hasEco: true, alreadyShown: true, level: 5 }), false)
assert.equal(shouldTriggerEco({ hasEco: false, alreadyShown: false, level: 5 }), false)

// el bonus suma puntos sin tocar el combo
{
  const run = createRun(50)
  run.hit(100); run.hit(100)
  const before = run.state()
  const r = run.bonus(ECO_BONUS)
  assert.equal(r.score, before.score + ECO_BONUS)
  assert.equal(r.combo, before.combo)
}
// con el reloj en pausa, el nivel no avanza: se simula descontando el tiempo del Eco
{
  const run = createRun(50)
  const paused = 15000
  assert.equal(run.tick(21000 - paused).level, 1 + Math.floor((21000 - paused) / 10000))
}
console.log('OK: Eco (cierre, tiempo, aparición y bonus)')
