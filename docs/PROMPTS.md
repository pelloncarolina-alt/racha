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

---

## Cómo se organizó el trabajo con la IA

- La IA propuso opciones y escribió código; yo elegí la dirección en cada decisión importante (sin marca, el Eco, la mecánica del pulso).
- El código se prueba con `npm test` (lógica del juego, racha, validaciones) y corriéndolo localmente con `npm run dev`.
