import { useEffect, useRef, useState } from 'react'
import useLatest from '../hooks/useLatest'
import TapButton from '../components/TapButton'
import { gradeTap, approachMs, pointsFor, gapRange } from '../game/scoring'
import { GOOD_MS } from '../game/config'

// Versión corta de Reflejos para usar dentro del marco común (por ejemplo, en el Eco).
// Usa las mismas reglas de puntería del motor: gradeTap() y approachMs() por nivel.
function ReflejosMini({ level, api }) {
  const levelRef = useLatest(level)
  const apiRef = useLatest(api)
  const [pulse, setPulse] = useState(null) // { id, duration }
  const pulseRef = useRef(null)
  const spawnAt = useRef(0)
  const timers = useRef({ spawn: null, expire: null })

  function schedule() {
    const gap = gapRange(levelRef.current)
    timers.current.spawn = setTimeout(spawn, gap.min + Math.random() * (gap.max - gap.min) + 300)
  }

  function spawn() {
    const duration = approachMs(levelRef.current)
    const p = { id: performance.now(), duration }
    pulseRef.current = p
    spawnAt.current = performance.now()
    setPulse(p)
    timers.current.expire = setTimeout(() => {
      if (pulseRef.current?.id !== p.id) return
      pulseRef.current = null
      setPulse(null)
      apiRef.current.miss('¡LLEGASTE TARDE!')
      schedule()
    }, duration + GOOD_MS)
  }

  useEffect(() => {
    const t = timers.current
    t.spawn = setTimeout(spawn, 500)
    return () => {
      clearTimeout(t.spawn)
      clearTimeout(t.expire)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function tap() {
    const p = pulseRef.current
    if (!p) {
      apiRef.current.miss('¡MUY PRONTO!')
      return
    }
    clearTimeout(timers.current.expire)
    const error = performance.now() - (spawnAt.current + p.duration)
    const grade = gradeTap(error)
    pulseRef.current = null
    setPulse(null)
    if (grade === 'perfect' || grade === 'great' || grade === 'good') {
      apiRef.current.hit(pointsFor(grade, 0), '¡BIEN!')
    } else {
      apiRef.current.miss(grade === 'early' ? '¡MUY PRONTO!' : '¡LLEGASTE TARDE!')
    }
    schedule()
  }

  return (
    <div className="arena">
      <div className="arena-ring" />
      {pulse && (
        <div
          key={pulse.id}
          className="arena-pulse arena-pulse-mini"
          style={{ animationDuration: `${pulse.duration}ms` }}
          data-testid="mini-pulse"
        />
      )}
      <TapButton onTap={tap} />
    </div>
  )
}

export default ReflejosMini
