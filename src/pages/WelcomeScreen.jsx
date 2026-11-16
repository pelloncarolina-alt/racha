import Avatar from '../components/Avatar'

function WelcomeScreen({ user, onRegister, onContinue, onSwitchAccount }) {
  return (
    <div className="welcome">
      <div className="welcome-glow" />

      <div className="welcome-content">
        <h1 className="welcome-logo">RACHA</h1>
        <p className="welcome-tagline">
          Un desafío por día.
          <br />
          Una racha que no querés cortar.
        </p>

        <ul className="welcome-pills">
          <li>⚡ Desafío diario</li>
          <li>🔁 Ecos</li>
          <li>👥 Competí con amigos</li>
        </ul>
      </div>

      <div className="welcome-actions">
        {user ? (
          <>
            <div className="welcome-returning">
              <Avatar avatar={user.avatar} size={44} />
              <p>
                Hola de nuevo, <strong>@{user.username}</strong>
              </p>
            </div>
            <button className="btn-primary" onClick={onContinue}>
              CONTINUAR
            </button>
            <button className="btn-secondary" onClick={onSwitchAccount}>
              USAR OTRA CUENTA
            </button>
          </>
        ) : (
          <>
            <button className="btn-primary" onClick={onRegister}>
              CREAR MI CUENTA
            </button>
            <p className="welcome-note">Es gratis y tarda menos de un minuto.</p>
          </>
        )}
      </div>
    </div>
  )
}

export default WelcomeScreen
