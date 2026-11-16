import { useCallback, useEffect, useRef, useState } from 'react'
import useLatest from './useLatest'
import { quizPoints } from '../game/games/quiz'

const REVEAL_OK_MS = 280
const REVEAL_FAIL_MS = 700

// Para los juegos de "una pregunta, una respuesta, poco tiempo" (Colores, Cuentas y las trivias).
// Pide una pregunta nueva según el nivel, corre el tiempo límite (que baja con el nivel),
// suma o resta con `api` y pasa a la siguiente.
export default function useTimedRounds({ api, level, makeQuestion, getTimeMs }) {
  const levelRef = useLatest(level)
  const apiRef = useLatest(api)
  const makeRef = useLatest(makeQuestion)
  const timeRef = useLatest(getTimeMs)

  const [round, setRound] = useState(null)
  const keyRef = useRef(0)
  const startedAt = useRef(0)
  const lockedRef = useRef(true)
  const limitRef = useRef(1)
  const timers = useRef({ limit: null, reveal: null })

  const next = useCallback(() => {
    const lvl = levelRef.current
    const limitMs = timeRef.current(lvl)
    keyRef.current += 1
    const key = keyRef.current
    limitRef.current = limitMs
    startedAt.current = performance.now()
    lockedRef.current = false
    setRound({ key, question: makeRef.current(lvl), limitMs, locked: false, picked: null })
    clearTimeout(timers.current.limit)
    timers.current.limit = setTimeout(() => {
      if (lockedRef.current || keyRef.current !== key) return
      lockedRef.current = true
      apiRef.current.miss('¡SE ACABÓ EL TIEMPO!')
      setRound((r) => r && { ...r, locked: true, picked: null, timedOut: true })
      timers.current.reveal = setTimeout(next, REVEAL_FAIL_MS)
    }, limitMs)
  }, [levelRef, timeRef, makeRef, apiRef])

  useEffect(() => {
    const t = timers.current
    next()
    return () => {
      clearTimeout(t.limit)
      clearTimeout(t.reveal)
    }
  }, [next])

  // `pickedKey` identifica qué opción tocó (para pintarla); `correct` si estaba bien
  const answer = useCallback(
    (correct, pickedKey) => {
      if (lockedRef.current) return
      lockedRef.current = true
      clearTimeout(timers.current.limit)
      const ratio = 1 - (performance.now() - startedAt.current) / limitRef.current
      if (correct) apiRef.current.hit(quizPoints(ratio), ratio > 0.6 ? '¡RÁPIDO!' : '¡BIEN!')
      else apiRef.current.miss('¡NO ERA!')
      setRound((r) => r && { ...r, locked: true, picked: pickedKey, wasCorrect: correct })
      timers.current.reveal = setTimeout(next, correct ? REVEAL_OK_MS : REVEAL_FAIL_MS)
    },
    [apiRef, next],
  )

  return { round, answer }
}
