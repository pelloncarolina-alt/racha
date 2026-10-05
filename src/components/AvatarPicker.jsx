import Avatar from './Avatar'
import { AVATARS } from '../utils/avatars'

function AvatarPicker({ value, onChange }) {
  return (
    <div className="avatar-picker" role="radiogroup" aria-label="Elegí tu avatar">
      {AVATARS.map((a) => (
        <button
          key={a.id}
          type="button"
          role="radio"
          aria-checked={value === a.id}
          className={`avatar-option ${value === a.id ? 'avatar-option-selected' : ''}`}
          onClick={() => onChange(a.id)}
        >
          <Avatar avatar={a.id} size={44} />
        </button>
      ))}
    </div>
  )
}

export default AvatarPicker
