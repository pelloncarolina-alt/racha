import { useRef } from 'react'
import useTimedRounds from '../hooks/useTimedRounds'
import TimeBar from '../components/TimeBar'
import { QUIZ_KINDS, QUIZ_TIME_MS, pickEntry } from '../game/games/quiz'

const HINTS = {
  cultura: 'Cultura general',
  capitales: 'Capitales del mundo',
  verdadero: '¿Verdadero o falso?',
}

// Un solo componente para las tres trivias: cambia el banco de preguntas y el tiempo límite
function QuizGame({ kind, level, api }) {
  const { bank, build } = QUIZ_KINDS[kind]
  const used = useRef(new Set())
  const makeQuestion = (lvl) => build(pickEntry(bank, lvl, used.current))
  const getTimeMs = (lvl) => QUIZ_TIME_MS[kind](lvl)
  const { round, answer } = useTimedRounds({ api, level, makeQuestion, getTimeMs })
  if (!round) return null
  const { question: q, locked, picked } = round
  const isBinary = kind === 'verdadero'

  return (
    <div className="qz">
      <TimeBar limitMs={round.limitMs} paused={locked} barKey={round.key} />
      <p className="qz-hint">{HINTS[kind]}</p>
      <p className="qz-prompt" data-testid="qz-prompt">{q.prompt}</p>
      <div className={`qz-options ${isBinary ? 'qz-options-binary' : ''}`}>
        {q.options.map((o, i) => {
          const isRight = locked && o.correct
          const isWrong = locked && picked === i && !o.correct
          return (
            <button
              key={`${round.key}-${i}`}
              className={`qz-option ${isBinary ? 'qz-option-big' : ''} ${isBinary && i === 0 ? 'qz-true' : ''} ${isBinary && i === 1 ? 'qz-false' : ''} ${isRight ? 'is-correct' : ''} ${isWrong ? 'is-wrong' : ''}`}
              data-testid="qz-option"
              onClick={() => answer(o.correct, i)}
            >
              {o.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default QuizGame
