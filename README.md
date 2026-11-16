# Racha

**Un desafío distinto por día. Una racha que no querés cortar.**

Proyecto Integrador — *Contenidos y Creatividad III* (Lic. en Comunicación Digital, Universidad de Palermo).
Videojuego web hecho con React y programado con asistencia de un agente de IA.

- **Juego online:** _(completar con el link de Vercel)_
- **Repositorio:** https://github.com/pelloncarolina-alt/racha

## La idea

Cada día hay un desafío nuevo de menos de un minuto. Si llegás a la **meta** del día, sumás un día de
**racha**; si no, la llama se apaga y podés reintentar. Y hay un giro propio: el **Eco**. Mientras jugás
el desafío de hoy, aparece de sorpresa un fragmento del desafío de ayer. Si lo cerrás, sumás puntos extra.
Así un día "se escucha" dentro del siguiente.

- **Público:** gente joven que juega en el celular en ratos cortos y le gusta competir con sus amigos.
- **Temática:** neón, llama y racha. La identidad visual es oscura, con vidrio esmerilado y luces violeta/cian.
- **Tono:** rioplatense y directo ("Tocá", "Lográ", "¡Racha asegurada!").

## Cómo se juega

1. Te registrás (usuario, mail, contraseña y avatar).
2. En **Inicio** ves tu racha y el desafío de hoy, con su meta de puntos.
3. Jugás: **5 niveles** por partida, cada uno más difícil. Los aciertos seguidos suben un combo (hasta x3).
4. **Ganar** (llegar a la meta) en el desafío del día suma un día de racha. **Perder** no suma, pero podés
   reintentar el mismo día.
5. En el nivel 3 aparece el **Eco de ayer**: 3 aciertos en 15 segundos de la mecánica de ayer y sumás +500.
   (En Reflejos, el Eco aparece antes de empezar.)
6. Ves tu resultado, tu clasificación contra amigos y podés compartirlo.

### Los 11 juegos

| Tipo | Juegos |
|------|--------|
| Reflejos | Reflejos: El pulso neón, Puntería, Topos |
| Agilidad mental | Colores, Cuentas, Orden |
| Memoria | Secuencia, Memotest |
| Cultura general | Cultura general, Capitales, Verdadero o falso |

El desafío del día **rota por los 11 juegos**, así cada día cambia la mecánica. Los demás se pueden
practicar desde la pestaña **Juegos** (no suman racha, pero guardan el récord).

### Dificultad por niveles

Todos los juegos usan **la misma regla** (`src/game/levels.js`): la partida se divide en 5 tramos iguales y,
al subir de nivel, el juego se pone más difícil (más rápido, más chico, más para memorizar, preguntas más
difíciles y menos tiempo para responder). Lo que cambia en cada juego está en
[`docs/DIFICULTAD.md`](docs/DIFICULTAD.md).

### Victoria y derrota

Cada juego tiene una **meta en puntos** (`goal` en `src/game/catalog.js`). Los mensajes de victoria y de
derrota están en `src/game/messages.js`.

## Modo demo

Como en la app real hay un solo desafío por día, en **Inicio** hay una caja "Modo demo" para mostrar todo
sin esperar. Elegís cualquiera de los 11 juegos y pasa a ser el **desafío de hoy**: se juega completo, con
sus 5 niveles, el Eco y la pantalla de victoria o derrota. El botón **Pasar al día siguiente** adelanta el
calendario de a un día. Si ganás un desafío elegido, suma racha como cualquier desafío del día (una vez por
fecha). Los demás juegos también se pueden practicar sueltos desde la pestaña **Juegos**.

## Navegación (React Router)

Las pantallas son rutas con `HashRouter` (funciona en localhost y en cualquier hosting estático):

| Ruta | Pantalla |
|------|----------|
| `/` | Bienvenida |
| `/registro` | Crear cuenta |
| `/inicio` | Inicio (racha, desafío del día, Eco, modo demo) |
| `/juego` | El desafío del día |
| `/jugar/:gameId` | Práctica libre de un juego |
| `/juegos` | Lista de los 11 desafíos |
| `/resultados` | Victoria o derrota, puntaje y clasificación |
| `/amigos` | Amigos |
| `/perfil` | Perfil, récords y Ecos cerrados |

Las rutas internas están protegidas: si no hay usuario registrado, vuelven a la bienvenida.

## Cómo correrlo

    npm install
    npm run dev

Abrir la URL que muestra la terminal (por defecto http://localhost:5173).

    npm run build      # genera la versión para publicar (carpeta dist)

## Estructura

    src/
    ├── main.jsx                HashRouter
    ├── App.jsx                 rutas y guardado de resultados
    ├── pages/                  Welcome, Register, Home, Games, Game, Results, Friends, Profile
    ├── components/             piezas reutilizables (GameShell, GameHUD, EcoMoment, Confetti, ...)
    ├── games/                  lo que se ve de cada juego (PunteriaGame, ToposGame, ...)
    ├── hooks/                  usePulseGame (Reflejos) y useTimedRounds (preguntas con tiempo)
    ├── game/                   las reglas, sin React (se pueden probar solas)
    │   ├── levels.js           niveles, común a todos los juegos
    │   ├── run.js              una partida: puntaje, combo, aciertos y nivel
    │   ├── eco.js              el Eco
    │   ├── messages.js         victoria, derrota y textos
    │   ├── catalog.js          los 11 juegos (nombre, pasos, meta, qué se endurece)
    │   ├── daily.js            cuál es el desafío de cada día
    │   ├── games/              la lógica de cada juego y su dificultad por nivel
    │   ├── banks/              preguntas (cultura general, capitales, verdadero o falso)
    │   └── config.js, scoring.js, engine.js   Reflejos (motor con animación)
    ├── App.css, games/games.css, glass.css    estilos (glass.css: vidrio esmerilado y efectos)
    └── utils/                  guardado del usuario, fechas, validaciones, avatares, modo demo

La idea central es separar el **cerebro** (`src/game/`, las reglas) de la **cara** (`components/`, `games/`).

## Pruebas

    npm test

Comprueban las reglas del juego: niveles, puntaje, Eco, metas y mensajes, que cada juego se pone más difícil
con el nivel, que los generadores (cuentas, colores, tableros) y los bancos de preguntas son correctos, la
rotación diaria, la racha y las validaciones. Además, los 11 juegos se jugaron completos con bots en un
navegador real (Chromium) para revisar que no fallen.

    npm run dificultad

Regenera `docs/DIFICULTAD.md` con lo que cambia en cada nivel.

## Publicación

El juego está publicado en Vercel (proyecto Vite, sin configuración extra: `npm run build` y carpeta `dist`).
Como las rutas usan `HashRouter`, funcionan en cualquier dispositivo sin ajustes del servidor.

## Proceso con IA y pruebas de usabilidad

- Registro de prompts y decisiones: [`docs/PROMPTS.md`](docs/PROMPTS.md).
- Pruebas de usabilidad: qué se probó hasta ahora y qué falta, en [`docs/USABILIDAD.md`](docs/USABILIDAD.md).

## Limitaciones conocidas

- Amigos y clasificación usan datos de ejemplo (no hay servidor).
- El registro es una simulación guardada en el navegador del dispositivo (sin la contraseña).
