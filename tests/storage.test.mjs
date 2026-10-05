import assert from 'node:assert/strict'
import { createUser, registerResult, hasPlayedToday } from '../src/utils/storage.js'
import { dateKey, daysAgoKey } from '../src/utils/dates.js'

let u = createUser({ username: 'caro', email: 'c@c.com', avatar: 'fox' })
assert.equal(u.streak, 0)
assert.equal(hasPlayedToday(u), false)

// primer desafío -> racha 1
u = registerResult(u, 1200)
assert.equal(u.streak, 1)
assert.equal(u.bestScore, 1200)
assert.equal(u.played, 1)
assert.equal(hasPlayedToday(u), true)

// segundo desafío el mismo día -> la racha NO sube, el mejor puntaje sí puede subir
u = registerResult(u, 2000)
assert.equal(u.streak, 1)
assert.equal(u.bestScore, 2000)
assert.equal(u.played, 2)
assert.equal(u.history.length, 1)

// mejor puntaje no baja
u = registerResult(u, 500)
assert.equal(u.bestScore, 2000)

// jugó ayer -> hoy la racha sube
let v = { ...createUser({ username: 'x', email: 'x@x.com', avatar: 'fox' }), streak: 3, history: [daysAgoKey(1)] }
v = registerResult(v, 100)
assert.equal(v.streak, 4)

// no jugó ayer -> la racha se reinicia en 1
let w = { ...createUser({ username: 'y', email: 'y@y.com', avatar: 'fox' }), streak: 6, history: [daysAgoKey(3)] }
w = registerResult(w, 100)
assert.equal(w.streak, 1)

console.log('OK: racha, mejor puntaje e historial funcionan bien')
