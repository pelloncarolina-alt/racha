// Cartel que aparece un momento cada vez que se sube de nivel
function LevelBanner({ level, note }) {
  if (level < 2) return null
  return (
    <div key={level} className="level-banner" role="status">
      <p className="level-banner-title">¡NIVEL {level}!</p>
      {note && <p className="level-banner-note">{note}</p>}
    </div>
  )
}

export default LevelBanner
