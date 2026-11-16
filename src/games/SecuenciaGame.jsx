import { useEffect, useRef, useState } from 'react'
import useLatest from '../hooks/useLatest'
import { secuenciaParams, newSequence, nextSequence, PADS } from '../game/games/secuencia'

const PAD_STYLES = ['pad-violet', 'pad-cyan', 'pad-yellow', 'pad-pink']
const PRESS_POINTS = 40
const ROUND_BONUS = 100
const START_LENGTH = 2

function SecuenciaGame({ level, api }) {
  const levelRef = useLatest(level)
  const apiRef = useLatest(api)
  const [mode, setMode] = useState('show') // show | input
  const [lit, setLit] = useState(null)
  const seqRef = useRef([])
  const idxRef = useRef(0)
  const modeRef = useRef('show')
  const timers = useRef([])

  function later(fn, ms) {
    const id = setTimeout(fn, ms)
    timers.current.push(id)
  }

  function setModeBoth(m) {
    modeRef.current = m
    setMode(m)
  }

  function playSequence(seq) {
    setModeBoth('show')
    idxRef.current = 0
    const { stepMs } = secuenciaParams(levelRef.current)
    seq.forEach((pad, i) => {
      later(() => setLit(pad), 500 + i * stepMs)
      later(() => setLit(null), 500 + i * stepMs + stepMs * 0.65)
    })
    later(() => setModeBoth('input'), 500 + seq.length * stepMs)
  }

  useEffect(() => {
    const list = timers.current
    seqRef.current = newSequence(START_LENGTH)
    playSequence(seqRef.current)
    return () => list.forEach(clearTimeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function press(pad, e) {
    e.preventDefault()
    if (modeRef.current !== 'input') return
    setLit(pad)
    later(() => setLit(null), 160)
    if (pad === seqRef.current[idxRef.current]) {
      apiRef.current.hit(PRESS_POINTS, '¡BIEN!')
      idxRef.current += 1
      if (idxRef.current >= seqRef.current.length) {
        apiRef.current.hit(ROUND_BONUS, '¡SECUENCIA!')
        setModeBoth('show')
        seqRef.current = nextSequence(seqRef.current)
        later(() => playSequence(seqRef.current), 600)
      }
    } else {
      apiRef.current.miss('¡ERROR!')
      setModeBoth('show')
      // Después de un error se vuelve a empezar con una secuencia un paso más corta
      seqRef.current = newSequence(Math.max(START_LENGTH, seqRef.current.length - 1))
      later(() => playSequence(seqRef.current), 800)
    }
  }

  return (
    <div className="seq">
      <p className="qz-hint" data-testid="seq-status" data-mode={mode}>
        {mode === 'show' ? 'MIRÁ…' : 'TU TURNO'}
      </p>
      <p className="seq-length">Secuencia de {seqRef.current.length}</p>
      <div className="seq-pads">
        {Array.from({ length: PADS }, (_, pad) => (
          <button
            key={pad}
            className={`seq-pad ${PAD_STYLES[pad]} ${lit === pad ? 'seq-pad-lit' : ''}`}
            data-testid={`pad-${pad}`}
            data-lit={lit === pad ? 'yes' : 'no'}
            aria-label={`Luz ${pad + 1}`}
            onPointerDown={(e) => press(pad, e)}
          />
        ))}
      </div>
    </div>
  )
}

export default SecuenciaGame
