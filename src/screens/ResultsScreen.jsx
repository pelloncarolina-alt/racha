import { useState } from 'react'
import RankingList from '../components/RankingList'
import ResultStats from '../components/ResultStats'
import { buildRanking } from '../game/scoring'
import { FRIENDS_RANKING } from '../game/config'

function ResultsScreen({ result, user, onHome }) {
  const [shareMessage, setShareMessage] = useState('')

  const ranking = buildRanking(user.username, result.score, FRIENDS_RANKING)

  async function handleShare() {
    const text = `Hice ${result.score.toLocaleString('en-US')} pts en el desafío Reflejos: El pulso neón de RACHA 🔥 Llevo ${user.streak} ${user.streak === 1 ? 'día' : 'días'} de racha. ¿Me ganás?`
    try {
      if (navigator.share) {
        await navigator.share({ text })
        return
      }
      await navigator.clipboard.writeText(text)
      setShareMessage('¡Copiado! Pegalo donde quieras')
    } catch (err) {
      if (err && err.name === 'AbortError') return // cerró el menú de compartir
      setShareMessage(text)
    }
  }

  return (
    <>
      <h2 className="results-title">¡DESAFÍO COMPLETADO!</h2>

      <section className="score-card">
        <p className="score-card-label">PUNTUACIÓN TOTAL</p>
        <p className="score-card-value">{result.score.toLocaleString('en-US')}</p>
        <p className="score-card-unit">PTS</p>
        {result.isNewBest && <p className="score-card-badge">🏆 ¡NUEVO RÉCORD!</p>}
      </section>

      <ResultStats result={result} />

      <p className="results-line">
        Mejor combo <strong>{result.bestCombo}</strong> · Precisión{' '}
        <strong>{result.accuracy}%</strong> · 🔥 Racha{' '}
        <strong>{user.streak}</strong>
      </p>

      <h3 className="screen-subtitle">CLASIFICACIÓN</h3>
      <RankingList ranking={ranking} playerAvatar={user.avatar} />

      <div className="results-actions">
        <button className="btn-primary" onClick={handleShare}>
          COMPARTIR RESULTADO
        </button>
        {shareMessage && <p className="results-share-message">{shareMessage}</p>}
        <button className="btn-secondary" onClick={onHome}>
          VOLVER AL INICIO
        </button>
      </div>
    </>
  )
}

export default ResultsScreen
