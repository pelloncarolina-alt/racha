import PunteriaGame from './PunteriaGame'
import ToposGame from './ToposGame'
import ColoresGame from './ColoresGame'
import CuentasGame from './CuentasGame'
import OrdenGame from './OrdenGame'
import SecuenciaGame from './SecuenciaGame'
import MemotestGame from './MemotestGame'
import QuizGame from './QuizGame'
import ReflejosMini from './ReflejosMini'

// Qué componente dibuja cada juego del catálogo.
// Reflejos tiene además su propia pantalla completa (ReflejosGame), con motor propio.
export const GAME_COMPONENTS = {
  reflejos: ReflejosMini, // versión corta, solo se usa dentro del Eco
  punteria: PunteriaGame,
  topos: ToposGame,
  colores: ColoresGame,
  cuentas: CuentasGame,
  orden: OrdenGame,
  secuencia: SecuenciaGame,
  memotest: MemotestGame,
  cultura: (props) => <QuizGame kind="cultura" {...props} />,
  capitales: (props) => <QuizGame kind="capitales" {...props} />,
  verdadero: (props) => <QuizGame kind="verdadero" {...props} />,
}
