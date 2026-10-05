// Cada función devuelve un mensaje de error, o '' si está todo bien

export function validateUsername(value) {
  const v = value.trim()
  if (v.length < 3) return 'Tu usuario tiene que tener al menos 3 caracteres'
  if (v.length > 16) return 'Máximo 16 caracteres'
  if (!/^[a-zA-Z0-9_]+$/.test(v)) return 'Solo letras, números y guión bajo (_)'
  return ''
}

export function validateEmail(value) {
  const v = value.trim()
  if (!v) return 'Ingresá tu mail'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return 'Ese mail no parece válido'
  return ''
}

export function validatePassword(value) {
  if (value.length < 6) return 'La contraseña tiene que tener al menos 6 caracteres'
  return ''
}
