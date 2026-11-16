# Registro de iteración con IA

Proyecto Integrador "Racha" — Contenidos y Creatividad III.
Herramienta usada: Claude (Anthropic), a lo largo de varias sesiones de trabajo.

Este registro resume los prompts que fui usando, en orden, qué produjo la IA y qué decidí yo en cada paso.

---

## 1. Definir la idea del juego

| # | Mi prompt (resumido) | Qué respondió la IA | Qué decidí yo |
|---|----------------------|---------------------|----------------|
| 1 | Tengo que crear un videojuego para la facultad, con niveles y creativo. Te paso la consigna y los proyectos de mis compañeros para no repetir. | Revisó los 7 proyectos de mis compañeros, marcó las mecánicas ya usadas y propuso 3 ideas originales. | Pedí no mezclar marcas de mi trabajo. |
| 2 | Me gusta uno que va por niveles, con desafíos distintos cada día, y que se juega con otras personas. | Armó la propuesta "Racha": un desafío diario con mecánica distinta cada día, racha y ranking social. | Pregunté por qué había una marca: decidí que el juego fuera **independiente, sin marca**. |
| 3 | ¿En qué le podemos dar un toque más fuerte, más original? | Propuso 3 ganchos: continuidad entre días, fantasmas de amigos y desafíos armados por la comunidad. | Elegí la **continuidad entre días**, como un bonus: nació el **"Eco"**. |
| 4 | Mandame cómo quedaría todo, así se lo mando a la profe. | Redactó la definición completa (descripción, público, objetivos, secciones, referencias). | Se la envié a la profesora y la propuesta quedó **aprobada**. |
| 5 | Devolución de la profesora: desarrollar un minijuego concreto y la función del Eco. | Detalló el minijuego "Reflejos" (puntaje, interacción) y cómo aparece, se identifica y se cierra el Eco. | — |

## 2. Análisis de un juego web

| # | Mi prompt (resumido) | Qué respondió la IA | Qué decidí yo |
|---|----------------------|---------------------|----------------|
| 6 | Tengo que analizar un juego web que me guste (por qué me gusta, qué funciona, qué mejorar, cómo está organizado). Elegí Crash. | Buscó la versión web de Crash Team Racing y armó el análisis. | Pedí un tono más criollo y propio, y le bajé la exageración ("no soy fan"). |

## 3. Etapa 1 — Estructura en React

| # | Mi prompt (resumido) | Qué respondió la IA | Qué decidí yo |
|---|----------------------|---------------------|----------------|
| 7 | Consigna: crear el proyecto en React con componentes a partir del wireframe. Te paso los apuntes y los wireframes. | Armó el proyecto con Vite y los componentes de la pantalla Home (Header, StreakBanner, ChallengeCard, EcoCard, BottomNav). | Lo corrí en mi compu (`npm install` / `npm run dev`) para verificar que funcionara. |
| 8 | Quiero sumar algo más a la entrega, ya que dice "como mínimo": un poco de las tres pantallas. | Sumó las pantallas Juego, Amigos y Perfil con sus componentes, y navegación básica con `useState`. | Elegí sumar las tres pantallas. |

## 4. Etapa 2 — Registro y desafío jugable

| # | Mi prompt (resumido) | Qué respondió la IA | Qué decidí yo |
|---|----------------------|---------------------|----------------|
| 9 | El profe pidió pantalla de inicio con registro y un desafío jugable "perfecto". | Planteó dos entregas y me preguntó cómo debía funcionar el desafío. | Elegí la mecánica: **un pulso se achica hacia el aro y se toca justo cuando lo alcanza** (más preciso = más puntos). |
| 10 | (respuesta a lo anterior) | Implementó registro con validaciones, motor del juego (puntaje, combo, velocidad creciente), resultados con ranking, racha y perfil real. Escribió pruebas automáticas. | Revisé el resultado. |

## 5. Momento 2 — React Router

| # | Mi prompt (resumido) | Qué respondió la IA | Qué decidí yo |
|---|----------------------|---------------------|----------------|
| 11 | Te paso la guía del Momento 2 para ver si el proyecto cumple. | Comparó el proyecto con la guía, detectó que faltaba **React Router**, migró la navegación a rutas (`/`, `/registro`, `/inicio`, `/juego`, `/resultados`, `/amigos`, `/perfil`) y preparó este registro. | — |

## 6. Momento 3 — Más juegos y dificultad por niveles

| # | Mi prompt (resumido) | Qué respondió la IA | Qué decidí yo |
|---|----------------------|---------------------|----------------|
| 12 | Te paso las clases 5, 6 y la del agente Cursor para ver qué aplicar. | Resumió las convenciones (carpeta `pages/`, `Link` para navegar, commits frecuentes, poder explicar el código generado) y las fechas de entrega. | Elegí aplicar todo lo que correspondiera al proyecto. |
| 13 | Hay que agregar unos 10 juegos más, algunos interactivos de cultura general. El profe pidió que suba la dificultad con los niveles; por ejemplo, que en el de TAP vaya más rápido con el tiempo. Que todos sigan esa misma lógica. | Propuso una **regla común de niveles** (5 niveles por partida, cada uno más difícil) y la aplicó a Reflejos. Armó 10 juegos nuevos: Puntería, Topos, Colores, Cuentas, Orden, Secuencia, Memotest, Cultura general, Capitales y Verdadero o falso. Cada uno endurece algo distinto con el nivel. | Definí qué quería (cantidad, cultura general, dificultad creciente con la misma lógica). Los juegos concretos los propuso la IA y los reviso yo. |
| 14 | (continuación) | Agregó el desafío del día rotativo, la lista de desafíos, la práctica libre (sin sumar racha), récords por juego y una tabla de dificultad (`docs/DIFICULTAD.md`). Probó los 11 juegos con bots en un navegador real y escribió pruebas automáticas. | Revisar y probar cada juego yo misma antes de la entrega. |

## 7. Momento 3 — Entrega final

| # | Mi prompt (resumido) | Qué respondió la IA | Qué decidí yo |
|---|----------------------|---------------------|----------------|
| 15 | No veía los juegos nuevos y quiero mostrarle todo al profe sin esperar 11 días. | Agregó un **modo demo** en Inicio: los 11 juegos a mano y un botón para pasar al día siguiente. | Elegí mostrarlo así en la presentación. |
| 16 | Te paso las consignas del Momento 3 para terminar el juego. | Las comparó con el proyecto. Agregó el **Eco dentro de la partida** (aparece de sorpresa y da +500), **metas con victoria y derrota** (solo ganar suma racha), mensajes propios del juego y el diseño con glassmorfismo y efectos. | Definí cómo funciona el Eco (fragmento del desafío de ayer) y revisé el resultado. |
| 17 | (continuación) | Armó el README final, la plantilla de prueba de usabilidad y la guía para publicar en Vercel. | Hago yo la prueba con una persona externa, publico en Vercel y subo a Instagram. |

---

## Cómo se organizó el trabajo con la IA

- La IA propuso opciones y escribió código; yo elegí la dirección en cada decisión importante (sin marca, el Eco, la mecánica del pulso).
- El código se prueba con `npm test` (lógica del juego, racha, validaciones) y corriéndolo localmente con `npm run dev`.
