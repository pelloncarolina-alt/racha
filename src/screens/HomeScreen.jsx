import StreakBanner from '../components/StreakBanner'
import ChallengeCard from '../components/ChallengeCard'
import EcoCard from '../components/EcoCard'
import { hasPlayedToday } from '../utils/storage'

function HomeScreen({ user, onPlay }) {
  return (
    <>
      <StreakBanner streakCount={user.streak} username={user.username} />
      <ChallengeCard
        title="REFLEJOS: EL PULSO NEÓN"
        playedToday={hasPlayedToday(user)}
        onPlay={onPlay}
      />
      <EcoCard mechanic="MEMORIA" status="Cerrado" />
    </>
  )
}

export default HomeScreen
