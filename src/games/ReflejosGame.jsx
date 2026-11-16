import { useEffect, useRef, useState } from 'react'
import usePulseGame from '../hooks/usePulseGame'
import GameHUD from '../components/GameHUD'
import ComboBadge from '../components/ComboBadge'
import FeedbackText from '../components/FeedbackText'
import PulseArena from '../components/PulseArena'
import HowToPlay from '../components/HowToPlay'
import Countdown from '../components/Countdown'
import LevelBanner from '../components/LevelBanner'
import EcoMoment from '../components/EcoMoment'
import { ECO_BONUS } from '../game/eco'

// Reflejos: El pulso neón. Tiene su propio motor (src/game/engine.js) porque necesita
// animación cuadro a cuadro; el resto de los juegos usan el GameShell.
//
// El Eco en este juego aparece ANTES de empezar (el motor corre con animación continua y no se
// puede pausar a mitad de partida como en los otros juegos).
function ReflejosGame({ game, mode, ecoGame, onQuit, onFinish }) {
  const eco = useRef({ status: null })
  const [showEco, setShowEco] = useState(false)
  const g = usePulseGame({
    onFinish: (result) =>
      onFinish({ ...result, eco: eco.current.status, ecoBonus: eco.current.status === 'closed' ? ECO_BONUS : 0 }),
  })
  const { phase, tap } = g

  function handleStart() {
    if (ecoGame && eco.current.status === null) setShowEco(true)
    else g.start()
  }

  function handleEcoDone(status) {
    eco.current.status = status
    setShowEco(false)
    if (status === 'closed') g.bonus(ECO_BONUS)
    g.start()
  }

  // También se puede jugar con la barra espaciadora (en compu)
  useEffect(() => {
    function handleKey(e) {
      if (e.code !== 'Space' && e.code !== 'Enter') return
      if (phase !== 'playing') return
      e.preventDefault()
      if (!e.repeat) tap()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [phase, tap])

  function handleQuit() {
    g.quit()
    onQuit()
  }

  return (
    <div className="game-screen" data-game={game.id} data-phase={phase}>
      <GameHUD time={g.timeLeft} score={g.hud.score} level={g.level} onClose={handleQuit} />
      <ComboBadge combo={g.hud.combo} multiplier={g.hud.multiplier} />
      <FeedbackText feedback={g.feedback} />
      <PulseArena pulseRef={g.pulseRef} feedback={g.feedback} onTap={g.tap} />
      <p className="game-hint">Tocá cuando el pulso llegue al aro</p>

      {phase === 'playing' && <LevelBanner level={g.level} note={game.levelUpNote} />}
      {showEco && <EcoMoment game={ecoGame} onDone={handleEcoDone} />}
      {phase === 'intro' && !showEco && (
        <HowToPlay game={game} mode={mode} ecoGame={ecoGame} ecoAtStart onStart={handleStart} />
      )}
      {phase === 'countdown' && <Countdown count={g.count} />}
    </div>
  )
}

export default ReflejosGame
