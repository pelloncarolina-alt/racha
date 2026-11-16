function ResultStats({ result }) {
  // Reflejos tiene precisión por toque; los demás juegos muestran aciertos, fallos y nivel
  const items = result.stats
    ? [
        { label: 'PERFECTOS', value: result.stats.perfect },
        { label: 'GENIALES', value: result.stats.great },
        { label: 'BIEN', value: result.stats.good },
        { label: 'FALLOS', value: result.misses },
      ]
    : [
        { label: 'ACIERTOS', value: result.hits },
        { label: 'FALLOS', value: result.misses },
        { label: 'NIVEL', value: result.level },
        { label: 'MEJOR COMBO', value: result.bestCombo },
      ]

  return (
    <div className="result-stats">
      {items.map((item) => (
        <div key={item.label} className="result-stat">
          <p className="result-stat-value">{item.value}</p>
          <p className="result-stat-label">{item.label}</p>
        </div>
      ))}
    </div>
  )
}

export default ResultStats
