import { useMemo } from 'react'

const COLORS = ['#b39dff', '#7de3ff', '#ffd84d', '#ff7aa8', '#4ade80']

// Lluvia de confeti (solo CSS) para cuando se gana un desafío
function Confetti({ pieces = 36 }) {
  const items = useMemo(
    () =>
      Array.from({ length: pieces }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.9,
        duration: 2.2 + Math.random() * 1.6,
        color: COLORS[i % COLORS.length],
        size: 6 + Math.random() * 6,
        spin: Math.random() * 720 - 360,
      })),
    [pieces],
  )
  return (
    <div className="confetti" aria-hidden="true">
      {items.map((p) => (
        <i
          key={p.id}
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 1.6,
            background: p.color,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            '--spin': `${p.spin}deg`,
          }}
        />
      ))}
    </div>
  )
}

export default Confetti
