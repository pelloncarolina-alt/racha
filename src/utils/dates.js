// Fecha local en formato AAAA-MM-DD
export function dateKey(date = new Date()) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function daysAgoKey(n, from = new Date()) {
  const d = new Date(from)
  d.setDate(d.getDate() - n)
  return dateKey(d)
}
