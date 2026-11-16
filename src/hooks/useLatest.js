import { useRef } from 'react'

// Guarda siempre el último valor en una ref, para leerlo desde timers sin que queden "viejos"
export default function useLatest(value) {
  const ref = useRef(value)
  ref.current = value
  return ref
}
