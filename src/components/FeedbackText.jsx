const LABELS = {
  perfect: '¡PERFECTO!',
  great: '¡GENIAL!',
  good: 'BIEN',
  early: 'MUY PRONTO',
  late: 'TARDE',
  stray: 'SIN PULSO',
}

function FeedbackText({ feedback }) {
  return (
    <div className="feedback-slot">
      {feedback && (
        <p key={feedback.key} className={`feedback feedback-${feedback.grade}`}>
          {LABELS[feedback.grade]}
          {feedback.points > 0 && <span className="feedback-points"> +{feedback.points}</span>}
        </p>
      )}
    </div>
  )
}

export default FeedbackText
