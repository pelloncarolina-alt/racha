import ProfileHeader from '../components/ProfileHeader'
import ActivityGrid from '../components/ActivityGrid'
import { daysAgoKey } from '../utils/dates'

const DAYS_SHOWN = 28

function ProfileScreen({ user, onLogout }) {
  // Últimos 28 días, del más viejo al de hoy
  const days = Array.from({ length: DAYS_SHOWN }, (_, i) => {
    const key = daysAgoKey(DAYS_SHOWN - 1 - i)
    return {
      key,
      done: user.history.includes(key),
      isToday: i === DAYS_SHOWN - 1,
    }
  })

  return (
    <>
      <ProfileHeader user={user} level={1 + user.played} />

      <div className="stats-row">
        <div className="stat-card">
          <p className="stat-card-label">MEJOR PUNTAJE</p>
          <p className="stat-card-value">{user.bestScore.toLocaleString('en-US')}</p>
        </div>
        <div className="stat-card">
          <p className="stat-card-label">DESAFÍOS JUGADOS</p>
          <p className="stat-card-value">{user.played}</p>
        </div>
      </div>

      <h3 className="screen-subtitle">ACTIVIDAD (ÚLTIMOS {DAYS_SHOWN} DÍAS)</h3>
      <ActivityGrid days={days} />

      <button className="btn-secondary" onClick={onLogout}>
        CERRAR SESIÓN
      </button>
    </>
  )
}

export default ProfileScreen
