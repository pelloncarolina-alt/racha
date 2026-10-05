import assert from 'node:assert/strict'
import { validateUsername, validateEmail, validatePassword } from '../src/utils/validation.js'

assert.notEqual(validateUsername('ab'), '')
assert.equal(validateUsername('caro_99'), '')
assert.notEqual(validateUsername('caro pellon'), '')
assert.notEqual(validateUsername('a'.repeat(17)), '')
assert.equal(validateUsername('  caro  '), '')
assert.notEqual(validateEmail(''), '')
assert.notEqual(validateEmail('caro@'), '')
assert.notEqual(validateEmail('caro@mail'), '')
assert.equal(validateEmail('caro@mail.com'), '')
assert.notEqual(validatePassword('12345'), '')
assert.equal(validatePassword('123456'), '')
console.log('OK: validaciones del registro')
