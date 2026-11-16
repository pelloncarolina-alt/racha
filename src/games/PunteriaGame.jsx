import { useEffect, useRef, useState } from 'react'
import useLatest from '../hooks/useLatest'
import { punteriaParams, randomSpot, punteriaPoints } from '../game/games/punteria'

function PunteriaGame({ level, api }) {
  const levelRef = useLatest(level)
  const apiRef = useLatest(api)
  const [target, setTarget] = useState(null)
  const targetRef = useRef(null)
  const idRef = useRef(0)
  const timers = useRef({ spawn: null, expire: null })

  function scheduleSpawn(delay) {
    clearTimeout(timers.current.spawn)
    timers.current.spawn = setTimeout(spawn, delay)
  }

  function spawn() {
    const p = punteriaParams(levelRef.current)
    idRef.current += 1
    const t = { id: idRef.current, ...randomSpot(), size: p.sizePx, life: p.lifeMs, born: performance.now() }
    targetRef.current = t
    setTarget(t)
    timers.current.expire = setTimeout(() => {
      if (targetRef.current?.id !== t.id) return
      targetRef.current = null
      setTarget(null)
      apiRef.current.miss('¡SE FUE!')
      scheduleSpawn(punteriaParams(levelRef.current).gapMs)
    }, t.life)
  }

  useEffect(() => {
    const t = timers.current
    scheduleSpawn(400)
    return () => {
      clearTimeout(t.spawn)
      clearTimeout(t.expire)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function hitTarget(e) {
    e.stopPropagation()
    e.preventDefault()
    const t = targetRef.current
    if (!t) return
    clearTimeout(timers.current.expire)
    const lifeLeft = 1 - (performance.now() - t.born) / t.life
    targetRef.current = null
    setTarget(null)
    apiRef.current.hit(punteriaPoints(lifeLeft), '¡BLANCO!')
    scheduleSpawn(punteriaParams(levelRef.current).gapMs)
  }

  return (
    <div className="pt-field" onPointerDown={() => apiRef.current.miss('AFUERA')} data-testid="pt-field">
      {target && (
        <button
          key={target.id}
          className="pt-target"
          data-testid="pt-target"
          aria-label="Blanco"
          style={{ left: `${target.x}%`, top: `${target.y}%`, width: target.size, height: target.size }}
          onPointerDown={hitTarget}
        >
          <span className="pt-ring" style={{ animationDuration: `${target.life}ms` }} />
          <span className="pt-dot" />
        </button>
      )}
      <p className="game-hint pt-hint">Tocá los blancos</p>
    </div>
  )
}

export default PunteriaGame
