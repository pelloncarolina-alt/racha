import { Navigate, useParams } from 'react-router-dom'
import { getGame } from '../game/catalog'
import { dailyGame, yesterdayGame } from '../game/daily'
import ReflejosGame from '../games/ReflejosGame'
import GameShell from '../components/GameShell'

// Una sola página para jugar cualquier juego:
//  - /juego           → el desafío del día (suma racha)
//  - /jugar/:gameId   → práctica libre de cualquier juego (no suma racha)
function GamePage({ daily, onQuit, onFinish }) {
  const { gameId } = useParams()
  const game = daily ? dailyGame() : getGame(gameId)
  if (!game) return <Navigate to="/juegos" replace />

  const mode = daily ? 'daily' : 'practice'
  const ecoGame = daily ? yesterdayGame() : null // el Eco solo aparece en el desafío del día
  const finish = (result) => onFinish(result, game.id, mode)

  // key = juego: si se cambia de juego, se arma una partida nueva desde cero
  if (game.id === 'reflejos') {
    return <ReflejosGame key={game.id} game={game} mode={mode} ecoGame={ecoGame} onQuit={onQuit} onFinish={finish} />
  }
  return <GameShell key={game.id} game={game} mode={mode} ecoGame={ecoGame} onQuit={onQuit} onFinish={finish} />
}

export default GamePage
