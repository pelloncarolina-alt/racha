function StreakBanner({ streakCount, username }) {
  return (
    <section className="streak-banner">
      <p className="streak-banner-greeting">Hola, @{username}</p>
      <p className="streak-banner-label">
        {streakCount > 0 ? '¡ESTÁS EN RACHA!' : '¡EMPEZÁ TU RACHA!'}
      </p>
      <p className="streak-banner-number">{streakCount}</p>
    </section>
  )
}

export default StreakBanner
