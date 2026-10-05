import assert from 'node:assert/strict'
import { gradeTap, multiplierFor, pointsFor, approachMs, buildRanking } from '../src/game/scoring.js'

// Precisión
assert.equal(gradeTap(0), 'perfect')
assert.equal(gradeTap(70), 'perfect')
assert.equal(gradeTap(-70), 'perfect')
assert.equal(gradeTap(71), 'great')
assert.equal(gradeTap(-140), 'great')
assert.equal(gradeTap(141), 'good')
assert.equal(gradeTap(230), 'good')
assert.equal(gradeTap(-231), 'early')
assert.equal(gradeTap(231), 'late')

// Multiplicador
assert.equal(multiplierFor(0), 1)
assert.equal(multiplierFor(4), 1)
assert.equal(multiplierFor(5), 2)
assert.equal(multiplierFor(9), 2)
assert.equal(multiplierFor(10), 3)
assert.equal(multiplierFor(50), 3)

// Puntos
assert.equal(pointsFor('perfect', 0), 100)
assert.equal(pointsFor('great', 0), 60)
assert.equal(pointsFor('good', 0), 30)
assert.equal(pointsFor('perfect', 5), 200)
assert.equal(pointsFor('perfect', 12), 300)
assert.equal(pointsFor('early', 12), 0)

// Velocidad
assert.equal(approachMs(0), 1500)
assert.equal(approachMs(45000), 850)
assert.ok(approachMs(22500) < 1500 && approachMs(22500) > 850)
assert.equal(approachMs(99999), 850)

// Ranking
const friends = [{ name: 'a', score: 4250 }, { name: 'b', score: 890 }, { name: 'c', score: 120 }]
let r = buildRanking('yo', 1500, friends)
assert.deepEqual(r.map(x => x.name), ['a', 'yo', 'b', 'c'])
assert.equal(r.find(x => x.isPlayer).position, 2)
r = buildRanking('yo', 5000, friends)
assert.equal(r[0].name, 'yo')
r = buildRanking('yo', 0, friends)
assert.equal(r[3].name, 'yo')

console.log('OK: toda la lógica del juego pasa las pruebas')
