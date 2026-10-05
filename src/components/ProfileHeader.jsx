import Avatar from './Avatar'

function ProfileHeader({ user, level }) {
  const streakText =
    user.streak === 0
      ? 'TODAVÍA SIN RACHA'
      : `${user.streak} ${user.streak === 1 ? 'DÍA' : 'DÍAS'} EN RACHA`

  return (
    <div className="profile-header">
      <div className="profile-avatar-wrap">
        <Avatar avatar={user.avatar} size={96} />
      </div>
      <span className="profile-level">LVL {level}</span>
      <p className="profile-username">{user.username}</p>
      <p className="profile-streak">{streakText}</p>
    </div>
  )
}

export default ProfileHeader
