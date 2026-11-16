// Barra que se vacía durante el tiempo límite de una pregunta.
// Con `key` nuevo la animación arranca de cero; si `paused`, se frena (mientras se muestra la respuesta).
function TimeBar({ limitMs, paused, barKey }) {
  return (
    <div className="timebar" aria-hidden="true">
      <div
        key={barKey}
        className={`timebar-fill ${paused ? 'timebar-paused' : ''}`}
        style={{ animationDuration: `${limitMs}ms` }}
      />
    </div>
  )
}

export default TimeBar
