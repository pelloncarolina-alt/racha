function Countdown({ count }) {
  return (
    <div className="game-overlay game-overlay-clear">
      <p key={count} className="countdown-number">
        {count}
      </p>
      <p className="howto-note">Preparate…</p>
    </div>
  )
}

export default Countdown
