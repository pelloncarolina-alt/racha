import GameCard from '../components/GameCard'
import { GAMES, CATEGORIES } from '../game/catalog'
import { dailyGame } from '../game/daily'

// Lista de todos los juegos, agrupados por tipo. El del día lleva la etiqueta HOY.
function GamesPage({ user }) {
  const today = dailyGame()

  return (
    <>
      <h2 className="screen-title">DESAFÍOS</h2>
      <p className="screen-intro">
        Cada día cambia el desafío que suma a tu racha. Los demás los podés practicar cuando
        quieras: no suman racha, pero guardan tu récord.
      </p>

      {Object.entries(CATEGORIES).map(([key, category]) => (
        <section key={key} className="games-group">
          <h3 className="screen-subtitle" style={{ color: category.color }}>
            {category.label}
          </h3>
          {GAMES.filter((g) => g.category === key).map((game) => (
            <GameCard
              key={game.id}
              game={game}
              best={user.bests[game.id]}
              isToday={game.id === today.id}
            />
          ))}
        </section>
      ))}
    </>
  )
}

export default GamesPage
