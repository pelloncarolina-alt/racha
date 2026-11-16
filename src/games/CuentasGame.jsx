import useTimedRounds from '../hooks/useTimedRounds'
import TimeBar from '../components/TimeBar'
import { cuentasParams, makeMathQuestion } from '../game/games/cuentas'

const makeQuestion = (level) => makeMathQuestion(level)
const getTimeMs = (level) => cuentasParams(level).timeMs

function CuentasGame({ level, api }) {
  const { round, answer } = useTimedRounds({ api, level, makeQuestion, getTimeMs })
  if (!round) return null
  const { question: q, locked, picked } = round

  return (
    <div className="qz">
      <TimeBar limitMs={round.limitMs} paused={locked} barKey={round.key} />
      <p className="qz-hint">Resolvé de cabeza</p>
      <p className="math-text" data-testid="math-text">{q.text} = ?</p>
      <div className="qz-options qz-options-grid">
        {q.options.map((value) => {
          const isRight = locked && value === q.answer
          const isWrong = locked && picked === value && value !== q.answer
          return (
            <button
              key={value}
              className={`qz-option qz-option-big ${isRight ? 'is-correct' : ''} ${isWrong ? 'is-wrong' : ''}`}
              data-testid="math-option"
              onPointerDown={(e) => {
                e.preventDefault()
                answer(value === q.answer, value)
              }}
            >
              {value}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default CuentasGame
