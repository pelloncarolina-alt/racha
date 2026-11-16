import assert from 'node:assert/strict'
import { GAMES } from '../src/game/catalog.js'
import { outcomeOf, ecoMessage } from '../src/game/messages.js'

for (const g of GAMES) assert.ok(g.goal > 0 && g.goal < g.ghost[0], `${g.id}: meta razonable`)

const game = GAMES.find((g) => g.id === 'punteria')
const win = outcomeOf({ score: game.goal + 10, level: 3 }, game, 'daily')
assert.equal(win.won, true)
assert.equal(win.streakCounts, true, 'ganar el desafío del día suma racha')
assert.equal(win.missing, 0)

const lose = outcomeOf({ score: game.goal - 500, level: 2 }, game, 'daily')
assert.equal(lose.won, false)
assert.equal(lose.streakCounts, false, 'perder el desafío del día NO suma racha')
assert.equal(lose.missing, 500)
assert.ok(lose.text.includes('500'), 'dice cuántos puntos faltaron')

const practiceWin = outcomeOf({ score: game.goal, level: 1 }, game, 'practice')
assert.equal(practiceWin.won, true)
assert.equal(practiceWin.streakCounts, false, 'la práctica nunca suma racha')

assert.ok(outcomeOf({ score: game.goal, level: 5 }, game, 'daily').text.includes('nivel 5'))
assert.equal(outcomeOf({ score: 0, level: 1 }, game, 'daily').won, false)
assert.ok(ecoMessage('closed', 500).includes('500'))
assert.ok(ecoMessage('lost', 500).includes('desvaneció'))
assert.equal(ecoMessage(null, 500), '')
console.log('OK: metas, victoria/derrota y mensajes')
