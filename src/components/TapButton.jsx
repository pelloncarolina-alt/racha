function TapButton({ onTap }) {
  return (
    <button
      className="tap-button"
      aria-label="Tocar"
      onPointerDown={(e) => {
        e.preventDefault()
        onTap()
      }}
    >
      TAP
    </button>
  )
}

export default TapButton
