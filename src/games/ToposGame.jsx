import { useEffect, useRef, useState } from 'react'
import useLatest from '../hooks/useLatest'
import { toposParams, pickHole, pickKind, HOLES } from '../game/games/topos'

const TICK_MS = 50
const MOLE_POINTS = 90

function ToposGame({ level, api }) {
  const levelRef = useLatest(level)
  const apiRef = useLatest(api)
  const holesRef = useRef(Array(HOLES).fill(null)) // cada cueva: null o { kind, until }
  const nextSpawn = useRef(0)
  const [view, setView] = useState(Array(HOLES).fill(null))
  const [hit, setHit] = useState(null) // { index, kind, key } para la animación

  useEffect(() => {
    nextSpawn.current = performance.now() + 500
    const id = setInterval(() => {
      const now = performance.now()
      const holes = holesRef.current
      const p = toposParams(levelRef.current)
      let changed = false

      holes.forEach((h, i) => {
        if (h && now >= h.until) {
          holes[i] = null
          changed = true
          if (h.kind === 'mole') apiRef.current.miss('¡SE ESCAPÓ!')
        }
      })

      const active = holes.filter(Boolean).length
      if (now >= nextSpawn.current && active < p.maxActive) {
        const occupied = holes.map((h, i) => (h ? i : -1)).filter((i) => i >= 0)
        const index = pickHole(occupied)
        if (index !== null) {
          holes[index] = { kind: pickKind(levelRef.current), until: now + p.upMs }
          changed = true
          nextSpawn.current = now + p.spawnMs * (0.7 + Math.random() * 0.6)
        }
      }
      if (changed) setView(holes.map((h) => (h ? h.kind : null)))
    }, TICK_MS)
    return () => clearInterval(id)
  }, [levelRef, apiRef])

  function tap(index, e) {
    e.preventDefault()
    const h = holesRef.current[index]
    if (!h) return
    holesRef.current[index] = null
    setView(holesRef.current.map((x) => (x ? x.kind : null)))
    setHit({ index, kind: h.kind, key: performance.now() })
    if (h.kind === 'mole') apiRef.current.hit(MOLE_POINTS, '¡TOPO!')
    else apiRef.current.miss('¡BOMBA!')
  }

  return (
    <div className="mole-grid" data-testid="mole-grid">
      {view.map((kind, i) => (
        <button
          key={i}
          className={`mole-hole ${kind ? 'mole-hole-up' : ''}`}
          data-kind={kind || 'empty'}
          data-testid={`hole-${i}`}
          aria-label={kind === 'bomb' ? 'Bomba' : kind === 'mole' ? 'Topo' : 'Cueva vacía'}
          onPointerDown={(e) => tap(i, e)}
        >
          {kind && <span className={`mole-thing mole-${kind}`}>{kind === 'bomb' ? '💣' : '🐹'}</span>}
          {hit && hit.index === i && !kind && (
            <span key={hit.key} className={`mole-pop mole-pop-${hit.kind}`}>
              {hit.kind === 'bomb' ? '💥' : '✨'}
            </span>
          )}
        </button>
      ))}
    </div>
  )
}

export default ToposGame
