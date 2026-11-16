import useTimedRounds from '../hooks/useTimedRounds'
import TimeBar from '../components/TimeBar'
import { coloresParams, makeColorQuestion } from '../game/games/colores'

const makeQuestion = (level) => makeColorQuestion(level)
const getTimeMs = (level) => coloresParams(level).timeMs

function ColoresGame({ level, api }) {
  const { round, answer } = useTimedRounds({ api, level, makeQuestion, getTimeMs })
  if (!round) return null
  const { question: q, locked, picked } = round

  return (
    <div className="qz">
      <TimeBar limitMs={round.limitMs} paused={locked} barKey={round.key} />
      <p className="qz-hint">Tocá el color de la TINTA</p>
      <p
        className="color-word"
        data-testid="color-word"
        data-ink={q.ink.id}
        style={{ color: q.ink.hex }}
      >
        {q.word.name}
      </p>
      <div className={`color-options color-options-${q.options.length}`}>
        {q.options.map((c) => {
          const isRight = locked && c.id === q.ink.id
          const isWrong = locked && picked === c.id && c.id !== q.ink.id
          return (
            <button
              key={c.id}
              className={`color-option ${isRight ? 'is-correct' : ''} ${isWrong ? 'is-wrong' : ''}`}
              data-testid={`color-${c.id}`}
              onPointerDown={(e) => {
                e.preventDefault()
                answer(c.id === q.ink.id, c.id)
              }}
            >
              <span className="color-swatch" style={{ background: c.hex }} />
              {c.name}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default ColoresGame
