function ComboBadge({ combo, multiplier }) {
  return (
    <div className="combo-badge-slot">
      {combo > 0 && (
        <p className={`combo-badge ${multiplier > 1 ? 'combo-badge-boost' : ''}`}>
          COMBO {combo}
          {multiplier > 1 && <span className="combo-badge-mult"> · x{multiplier}</span>}
        </p>
      )}
    </div>
  )
}

export default ComboBadge
