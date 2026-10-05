function EcoCard({ mechanic, status }) {
  return (
    <section className="eco-card">
      <p className="eco-card-label">EL ECO DE AYER</p>
      <div className="eco-card-content">
        <span className="eco-card-icon">🧠</span>
        <div>
          <p className="eco-card-mechanic">{mechanic}</p>
          <p className="eco-card-status">{status}</p>
        </div>
        <span className="eco-card-arrow">›</span>
      </div>
    </section>
  )
}

export default EcoCard
