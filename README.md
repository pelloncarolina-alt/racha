# Racha

Proyecto Integrador — Contenidos y Creatividad 3.
Momento 2: pantalla de inicio con registro, desafío jugable y navegación con React Router.

## Cómo correrlo

    npm install
    npm run dev

Abrir la URL que muestra la terminal (por defecto http://localhost:5173).

## Navegación (React Router)

Las pantallas son rutas (con `HashRouter`, así funciona en localhost y en cualquier hosting estático):

| Ruta | Pantalla |
|------|----------|
| `/` | Bienvenida |
| `/registro` | Crear cuenta |
| `/inicio` | Home (racha, desafío del día, Eco de ayer) |
| `/juego` | Desafío "Reflejos: El pulso neón" |
| `/resultados` | Resultados y clasificación |
| `/amigos` | Amigos |
| `/perfil` | Perfil |

Las rutas internas están protegidas: si no hay usuario registrado, vuelven a la bienvenida.
El botón "atrás" del navegador funciona.

## Qué tiene

- **Bienvenida** y **registro** (usuario, mail, contraseña y avatar) con validaciones.
  El registro es una simulación: se guarda en el navegador (sin la contraseña) y
  todavía no hay servidor.
- **Home** con la racha, el desafío del día y el Eco de ayer.
- **Desafío "Reflejos: El pulso neón"**: un pulso se achica hacia el aro y hay que
  tocar TAP justo cuando lo alcanza. Dura 45 segundos, se acelera de a poco.
  - PERFECTO 100 pts · GENIAL 60 pts · BIEN 30 pts
  - Cada 5 aciertos seguidos sube el multiplicador (hasta x3). Un fallo corta el combo.
  - También se puede jugar con la barra espaciadora.
- **Resultados** con puntaje, precisión, mejor combo, clasificación contra amigos y
  botón para compartir.
- **Perfil** con racha, mejor puntaje, desafíos jugados y calendario de actividad.
- **Amigos**.

La racha sube una vez por día: si jugás dos días seguidos suma, si te salteás un día
vuelve a 1.

## Estructura

    src/
    ├── main.jsx                (HashRouter)
    ├── App.jsx                 (define las rutas)
    ├── screens/                Welcome, Register, Home, Game, Results, Friends, Profile
    ├── components/             piezas reutilizables (Header, ChallengeCard, PulseArena, ...)
    ├── hooks/usePulseGame.js   conecta el motor del juego con React
    ├── game/
    │   ├── config.js           tiempos, puntos y multiplicadores
    │   ├── scoring.js          precisión, puntos, velocidad, ranking
    │   └── engine.js           el motor del desafío (pulso, timer, toques)
    └── utils/                  guardado del usuario, fechas, validaciones, avatares

## Pruebas

    npm test

Simulan partidas completas (jugador perfecto, jugador que no toca, jugador apurado),
la racha diaria y las validaciones del registro.

## Evidencia de trabajo con IA

El registro de prompts está en [`docs/PROMPTS.md`](docs/PROMPTS.md).

## Pendiente (hacia el Momento 3)

- El **Eco** todavía no ocurre dentro de la partida: hoy es una tarjeta en Home.
- Un solo minijuego (Reflejos). La propuesta prevé uno distinto por día.
- Amigos y ranking con datos de ejemplo, sin servidor.
- El registro es una simulación guardada en el navegador.
