import Avatar from './Avatar'

function Header({ user }) {
  return (
    <header className="header">
      <div className="header-left">
        <Avatar avatar={user.avatar} size={36} />
        <h1 className="header-title">RACHA</h1>
      </div>
      <span className="header-streak">🔥 {user.streak}</span>
    </header>
  )
}

export default Header
