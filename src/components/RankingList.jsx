import Avatar from './Avatar'

function RankingList({ ranking, playerAvatar }) {
  return (
    <div className="ranking">
      {ranking.map((entry) => (
        <div
          key={entry.name}
          className={`ranking-row ${entry.isPlayer ? 'ranking-row-player' : ''}`}
        >
          <span className="ranking-position">{entry.position}</span>
          {entry.isPlayer ? (
            <Avatar avatar={playerAvatar} size={34} />
          ) : (
            <div className="ranking-avatar" />
          )}
          <span className="ranking-name">{entry.isPlayer ? 'Tú' : entry.name}</span>
          <span className="ranking-score">{entry.score.toLocaleString('en-US')}</span>
        </div>
      ))}
    </div>
  )
}

export default RankingList
