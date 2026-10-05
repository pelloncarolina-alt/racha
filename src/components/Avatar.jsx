import { getAvatar } from '../utils/avatars'

function Avatar({ avatar, size = 40 }) {
  const a = getAvatar(avatar)
  return (
    <div
      className="avatar"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.5,
        background: `linear-gradient(135deg, ${a.from}, ${a.to})`,
      }}
      aria-hidden="true"
    >
      {a.emoji}
    </div>
  )
}

export default Avatar
