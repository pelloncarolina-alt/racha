import { useEffect, useRef, useState } from 'react'
import useLatest from '../hooks/useLatest'
import { ordenParams, makeBoard, COLS, ROWS } from '../game/games/orden'

const NUMBER_POINTS = 50
const BOARD_BONUS = 100

function OrdenGame({ level, api }) {
  const levelRef = useLatest(level)
  const apiRef = useLatest(api)
  const [board, setBoard] = useState(() => makeBoard(ordenParams(level).count))
  const [next, setNext] = useState(1)
  const [wrong, setWrong] = useState(null) // { cell, key }
  const nextRef = useRef(1)
  const boardRef = useRef(board)
  const timer = useRef(null)

  useEffect(() => () => clearTimeout(timer.current), [])

  function newBoard() {
    const b = makeBoard(ordenParams(levelRef.current).count)
    boardRef.current = b
    nextRef.current = 1
    setBoard(b)
    setNext(1)
  }

  function tapNumber(n, cell, e) {
    e.preventDefault()
    if (n < nextRef.current) return
    if (n !== nextRef.current) {
      setWrong({ cell, key: performance.now() })
      apiRef.current.miss('¡ESE NO!')
      return
    }
    apiRef.current.hit(NUMBER_POINTS, `¡${n}!`)
    nextRef.current = n + 1
    setNext(n + 1)
    const total = boardRef.current.length
    if (n === total) {
      apiRef.current.hit(BOARD_BONUS, '¡TABLERO COMPLETO!')
      timer.current = setTimeout(newBoard, 350)
    } else if (ordenParams(levelRef.current).shuffleOnTap) {
      // Nivel 5: los números que quedan se mezclan de lugar
      const b = makeBoard(total)
      boardRef.current = b
      setBoard(b)
    }
  }

  const cellToNumber = {}
  board.forEach((cell, i) => {
    cellToNumber[cell] = i + 1
  })

  return (
    <div className="ord">
      <p className="qz-hint">
        Buscá el <strong className="ord-next" data-testid="ord-next">{next <= board.length ? next : '✓'}</strong>
      </p>
      <div className="ord-grid" style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)`, gridTemplateRows: `repeat(${ROWS}, 1fr)` }}>
        {Array.from({ length: COLS * ROWS }, (_, cell) => {
          const n = cellToNumber[cell]
          const done = n !== undefined && n < next
          if (n === undefined || done) {
            return <span key={cell} className="ord-cell ord-empty" />
          }
          return (
            <button
              key={cell}
              className={`ord-cell ord-num ${wrong && wrong.cell === cell ? 'ord-wrong' : ''}`}
              data-testid="ord-num"
              data-n={n}
              onPointerDown={(e) => tapNumber(n, cell, e)}
            >
              {n}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default OrdenGame
