import { useEffect, useRef, useState } from 'react'
import useLatest from '../hooks/useLatest'
import { memotestParams, makeDeck } from '../game/games/memotest'

const PAIR_POINTS = 60
const BOARD_BONUS = 100

function newBoard(level) {
  const p = memotestParams(level)
  return { cards: makeDeck(p.pairs), cols: p.cols, hideMs: p.hideMs }
}

function MemotestGame({ level, api }) {
  const levelRef = useLatest(level)
  const apiRef = useLatest(api)
  const [board, setBoard] = useState(() => newBoard(level))
  const [flipped, setFlipped] = useState([]) // ids dados vuelta, todavía sin resolver
  const [matched, setMatched] = useState([])
  const lockRef = useRef(false)
  const timers = useRef([])

  function later(fn, ms) {
    timers.current.push(setTimeout(fn, ms))
  }

  useEffect(() => {
    const list = timers.current
    return () => list.forEach(clearTimeout)
  }, [])

  function flip(card, e) {
    e.preventDefault()
    if (lockRef.current || flipped.includes(card.id) || matched.includes(card.id)) return
    const now = [...flipped, card.id]
    setFlipped(now)
    if (now.length < 2) return

    lockRef.current = true
    const [a, b] = now.map((id) => board.cards.find((c) => c.id === id))
    if (a.face === b.face) {
      apiRef.current.hit(PAIR_POINTS, '¡PAREJA!')
      const all = [...matched, a.id, b.id]
      later(() => {
        setMatched(all)
        setFlipped([])
        if (all.length === board.cards.length) {
          apiRef.current.hit(BOARD_BONUS, '¡TABLERO COMPLETO!')
          later(() => {
            setBoard(newBoard(levelRef.current))
            setMatched([])
            lockRef.current = false
          }, 450)
        } else {
          lockRef.current = false
        }
      }, 200)
    } else {
      apiRef.current.miss('NO COINCIDEN')
      later(() => {
        setFlipped([])
        lockRef.current = false
      }, board.hideMs)
    }
  }

  return (
    <div className="mem">
      <p className="qz-hint">Encontrá las parejas</p>
      <div className="mem-grid" style={{ gridTemplateColumns: `repeat(${board.cols}, 1fr)` }} data-testid="mem-grid">
        {board.cards.map((card) => {
          const up = flipped.includes(card.id) || matched.includes(card.id)
          return (
            <button
              key={card.id}
              className={`mem-card ${up ? 'mem-up' : ''} ${matched.includes(card.id) ? 'mem-matched' : ''}`}
              data-testid="mem-card"
              data-id={card.id}
              data-face={up ? card.face : ''}
              aria-label={up ? card.face : 'Carta boca abajo'}
              onPointerDown={(e) => flip(card, e)}
            >
              <span className="mem-front">{up ? card.face : ''}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default MemotestGame
