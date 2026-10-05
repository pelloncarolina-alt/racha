import { useEffect } from 'react'
import usePulseGame from '../hooks/usePulseGame'
import GameHUD from '../components/GameHUD'
import ComboBadge from '../components/ComboBadge'
import FeedbackText from '../components/FeedbackText'
import PulseArena from '../components/PulseArena'
import HowToPlay from '../components/HowToPlay'
import Countdown from '../components/Countdown'

function GameScreen({ onQuit, onFinish }) {
  const game = usePulseGame({ onFinish })
  const { phase, tap } = game

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
    game.quit()
    onQuit()
  }

  return (
    <div className="game-screen">
      <GameHUD time={game.timeLeft} score={game.hud.score} onClose={handleQuit} />
      <ComboBadge combo={game.hud.combo} multiplier={game.hud.multiplier} />
      <FeedbackText feedback={game.feedback} />
      <PulseArena pulseRef={game.pulseRef} feedback={game.feedback} onTap={game.tap} />
      <p className="game-hint">Tocá cuando el pulso llegue al aro</p>

      {phase === 'intro' && <HowToPlay onStart={game.start} />}
      {phase === 'countdown' && <Countdown count={game.count} />}
    </div>
  )
}

export default GameScreen
