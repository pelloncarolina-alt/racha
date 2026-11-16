# Dificultad por nivel

Todos los juegos de Racha usan **la misma lógica**: cada partida se divide en 5 niveles de igual duración
(`src/game/levels.js`). Al pasar de nivel el juego se pone más difícil: más rápido, más chico, más para memorizar
o preguntas más complicadas. Cada juego decide **qué** se endurece en su archivo `src/game/games/<juego>.js`.

> Esta tabla se genera sola con `npm run dificultad`, leyendo los valores reales del código.

## ⚡ Reflejos: El pulso neón (45 s)

El pulso llega cada vez más rápido y aparece más seguido.

| Nivel | Qué pasa |
|---|---|
| 1 | El pulso tarda 1,5 s en llegar · pausa entre pulsos 0,35 s a 0,8 s |
| 2 | El pulso tarda 1,3 s en llegar · pausa entre pulsos 0,3 s a 0,69 s |
| 3 | El pulso tarda 1,11 s en llegar · pausa entre pulsos 0,26 s a 0,59 s |
| 4 | El pulso tarda 0,92 s en llegar · pausa entre pulsos 0,21 s a 0,48 s |
| 5 | El pulso tarda 0,72 s en llegar · pausa entre pulsos 0,16 s a 0,38 s |

## 🎯 Puntería (40 s)

Los blancos son más chicos, duran menos y salen más seguido.

| Nivel | Qué pasa |
|---|---|
| 1 | Blanco de 76 px · dura 1,7 s · aparece cada 0,45 s |
| 2 | Blanco de 66 px · dura 1,48 s · aparece cada 0,37 s |
| 3 | Blanco de 56 px · dura 1,26 s · aparece cada 0,29 s |
| 4 | Blanco de 46 px · dura 1,04 s · aparece cada 0,22 s |
| 5 | Blanco de 36 px · dura 0,82 s · aparece cada 0,14 s |

## 🐹 Topos (40 s)

Salen más topos a la vez, se quedan menos y llegan las bombas.

| Nivel | Qué pasa |
|---|---|
| 1 | Hasta 1 topo(s) a la vez · se queda 1,2 s · sale cada ~0,8 s · bombas 0 % |
| 2 | Hasta 2 topo(s) a la vez · se queda 1,04 s · sale cada ~0,68 s · bombas 0 % |
| 3 | Hasta 2 topo(s) a la vez · se queda 0,88 s · sale cada ~0,56 s · bombas 14 % |
| 4 | Hasta 3 topo(s) a la vez · se queda 0,72 s · sale cada ~0,44 s · bombas 21 % |
| 5 | Hasta 3 topo(s) a la vez · se queda 0,56 s · sale cada ~0,32 s · bombas 28 % |

## 🎨 Colores (40 s)

Hay más colores para elegir, la palabra miente más y tenés menos tiempo.

| Nivel | Qué pasa |
|---|---|
| 1 | 3 colores · la palabra miente 35 % de las veces · 4,2 s por pregunta |
| 2 | 4 colores · la palabra miente 51 % de las veces · 3,63 s por pregunta |
| 3 | 5 colores · la palabra miente 68 % de las veces · 3,05 s por pregunta |
| 4 | 5 colores · la palabra miente 84 % de las veces · 2,48 s por pregunta |
| 5 | 6 colores · la palabra miente 100 % de las veces · 1,9 s por pregunta |

## 🧮 Cuentas (45 s)

Las cuentas pasan de sumas a restas, tablas y combinadas, con menos tiempo.

| Nivel | Qué pasa |
|---|---|
| 1 | Sumas hasta 12 · 7,0 s por cuenta |
| 2 | Sumas y restas hasta 60 · 6,2 s por cuenta |
| 3 | Tablas del 2 al 9 · 5,4 s por cuenta |
| 4 | Tablas hasta 12 y restas de 2 cifras · 4,6 s por cuenta |
| 5 | Combinadas (a × b ± c) · 3,8 s por cuenta |

## 🔢 Orden (50 s)

Cada tablero tiene más números y, en el nivel 5, ¡se mezclan de lugar!

| Nivel | Qué pasa |
|---|---|
| 1 | 5 números por tablero |
| 2 | 8 números por tablero |
| 3 | 10 números por tablero |
| 4 | 13 números por tablero |
| 5 | 15 números por tablero · se mezclan después de cada acierto |

## 🎹 Secuencia (60 s)

La secuencia se muestra cada vez más rápido.

| Nivel | Qué pasa |
|---|---|
| 1 | Cada luz dura 0,72 s |
| 2 | Cada luz dura 0,61 s |
| 3 | Cada luz dura 0,51 s |
| 4 | Cada luz dura 0,41 s |
| 5 | Cada luz dura 0,3 s |

## 🃏 Memotest (60 s)

Los tableros son más grandes y las cartas se tapan más rápido.

| Nivel | Qué pasa |
|---|---|
| 1 | 3 parejas (6 cartas) · las que no coinciden se tapan en 0,95 s |
| 2 | 4 parejas (8 cartas) · las que no coinciden se tapan en 0,82 s |
| 3 | 6 parejas (12 cartas) · las que no coinciden se tapan en 0,69 s |
| 4 | 6 parejas (12 cartas) · las que no coinciden se tapan en 0,55 s |
| 5 | 8 parejas (16 cartas) · las que no coinciden se tapan en 0,42 s |

## 🧠 Cultura general (50 s)

Las preguntas son cada vez más difíciles y hay menos tiempo para pensar.

| Nivel | Qué pasa |
|---|---|
| 1 | Preguntas fáciles · 10,0 s para responder |
| 2 | Preguntas fáciles · 8,88 s para responder |
| 3 | Preguntas medias · 7,75 s para responder |
| 4 | Preguntas medias · 6,63 s para responder |
| 5 | Preguntas difíciles · 5,5 s para responder |

## 🌎 Capitales (50 s)

Pasás de capitales conocidas a las que siempre se confunden.

| Nivel | Qué pasa |
|---|---|
| 1 | Capitales fáciles · 8,0 s para responder |
| 2 | Capitales fáciles · 7,13 s para responder |
| 3 | Capitales medias · 6,25 s para responder |
| 4 | Capitales medias · 5,38 s para responder |
| 5 | Capitales difíciles · 4,5 s para responder |

## ✅ Verdadero o falso (40 s)

Las afirmaciones son más tramposas y el tiempo para decidir se achica.

| Nivel | Qué pasa |
|---|---|
| 1 | Afirmaciones fáciles · 5,5 s para decidir |
| 2 | Afirmaciones fáciles · 4,72 s para decidir |
| 3 | Afirmaciones medias · 3,95 s para decidir |
| 4 | Afirmaciones medias · 3,17 s para decidir |
| 5 | Afirmaciones difíciles · 2,4 s para decidir |

