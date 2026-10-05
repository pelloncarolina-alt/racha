function ChallengeCard({ title, playedToday, onPlay }) {
  return (
    <section className="challenge-card">
      <p className="challenge-card-label">DESAFÍO DIARIO</p>
      <h2 className="challenge-card-title">{title}</h2>
      {playedToday && (
        <p className="challenge-card-done">✓ Ya sumaste tu racha de hoy. Podés seguir practicando.</p>
      )}
      <button className="challenge-card-button" onClick={onPlay}>
        {playedToday ? 'JUGAR DE NUEVO' : 'JUGAR DESAFÍO'}
      </button>
    </section>
  )
}

export default ChallengeCard
