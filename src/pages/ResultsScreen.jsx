import { useState } from 'react'
import { Link } from 'react-router-dom'
import RankingList from '../components/RankingList'
import ResultStats from '../components/ResultStats'
import Confetti from '../components/Confetti'
import { buildRanking, friendsFor } from '../game/scoring'
import { getGame } from '../game/catalog'
import { outcomeOf, ecoMessage } from '../game/messages'

function ResultsScreen({ result, user, onHome }) {
  const [shareMessage, setShareMessage] = useState('')

  const game = getGame(result.gameId)
  const isDaily = result.mode === 'daily'
  const outcome = outcomeOf(result, game, result.mode)
  const ranking = buildRanking(user.username, result.score, friendsFor(game))
  const goalPercent = Math.min(100, Math.round((result.score / outcome.goal) * 100))

  async function handleShare() {
    const text = outcome.won
      ? `Hice ${result.score.toLocaleString('en-US')} pts en ${game.name} (nivel ${result.level}) en RACHA 🔥 Llevo ${user.streak} ${user.streak === 1 ? 'día' : 'días'} de racha. ¿Me ganás?`
      : `Hoy me costó ${game.name} en RACHA: ${result.score.toLocaleString('en-US')} pts. ¿Te animás a superarme?`
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
      {outcome.won && <Confetti />}

      <section className={`outcome ${outcome.won ? 'outcome-win' : 'outcome-lose'}`} data-testid="outcome" data-won={outcome.won}>
        <p className="outcome-emoji">{outcome.emoji}</p>
        <h2 className="outcome-title">{outcome.title}</h2>
        <p className="outcome-text">{outcome.text}</p>
        <p className="outcome-game">
          {game.icon} {game.name} · nivel {result.level}
        </p>
      </section>

      <section className="score-card">
        <p className="score-card-label">PUNTUACIÓN TOTAL</p>
        <p className="score-card-value">{result.score.toLocaleString('en-US')}</p>
        <p className="score-card-unit">PTS</p>
        {result.isNewBest && <p className="score-card-badge">🏆 ¡NUEVO RÉCORD!</p>}
        <div className="goal-bar" aria-hidden="true">
          <div className="goal-bar-fill" style={{ width: `${goalPercent}%` }} />
        </div>
        <p className="goal-bar-text">
          Meta {outcome.goal.toLocaleString('en-US')} pts · {goalPercent}%
        </p>
      </section>

      {result.eco && (
        <p className={`eco-result eco-result-${result.eco}`} data-testid="eco-line">
          {ecoMessage(result.eco, result.ecoBonus)}
        </p>
      )}

      <ResultStats result={result} />

      <p className="results-line">
        Mejor combo <strong>{result.bestCombo}</strong> · Precisión{' '}
        <strong>{result.accuracy}%</strong> · 🔥 Racha{' '}
        <strong>{user.streak}</strong>
      </p>
      {!isDaily && (
        <p className="results-practice">Esto fue práctica: no suma a tu racha, pero guarda tu récord.</p>
      )}
      {isDaily && !outcome.won && (
        <p className="results-practice">Tu racha no sumó hoy. Reintentá el desafío para salvarla.</p>
      )}

      <h3 className="screen-subtitle">CLASIFICACIÓN</h3>
      <RankingList ranking={ranking} playerAvatar={user.avatar} />

      <div className="results-actions">
        {isDaily && !outcome.won && (
          <Link to="/juego" className="btn-primary results-retry" data-testid="retry">
            REINTENTAR DESAFÍO
          </Link>
        )}
        <button className={isDaily && !outcome.won ? 'btn-secondary' : 'btn-primary'} onClick={handleShare}>
          COMPARTIR RESULTADO
        </button>
        {shareMessage && <p className="results-share-message">{shareMessage}</p>}
        <button className="btn-secondary" onClick={onHome}>
          VOLVER AL INICIO
        </button>
        <Link to={isDaily ? '/juegos' : `/jugar/${game.id}`} className="results-link">
          {isDaily ? 'Practicar otros juegos' : 'Jugar de nuevo'}
        </Link>
      </div>
    </>
  )
}

export default ResultsScreen
