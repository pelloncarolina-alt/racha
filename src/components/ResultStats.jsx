function ResultStats({ result }) {
  const misses = result.stats.early + result.stats.late + result.stats.stray
  const items = [
    { label: 'PERFECTOS', value: result.stats.perfect },
    { label: 'GENIALES', value: result.stats.great },
    { label: 'BIEN', value: result.stats.good },
    { label: 'FALLOS', value: misses },
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
