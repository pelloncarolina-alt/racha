import TapButton from './TapButton'

// El aro fijo, el pulso que se achica (se mueve desde el hook) y el botón TAP
function PulseArena({ pulseRef, feedback, onTap }) {
  return (
    <div className="arena">
      <div className="arena-ring" />
      <div className="arena-pulse" ref={pulseRef} />
      {feedback && (
        <div key={feedback.key} className={`arena-burst burst-${feedback.grade}`} />
      )}
      <TapButton onTap={onTap} />
    </div>
  )
}

export default PulseArena
