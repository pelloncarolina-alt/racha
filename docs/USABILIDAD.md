# Prueba de usabilidad

## Datos de la prueba

- **Quiénes probaron:** 4 personas de mi entorno (familia y amigos), que no participaron del desarrollo del juego.
- **Dispositivos:** 2 personas desde el celular y 2 desde la compu.
- **Qué se hizo:** cada persona jugó Racha y me dio su opinión. Anoté lo que no entendieron y lo que les gustó.

## Lo que dijeron y lo que cambié

| Lo que pasó | Ajuste que hice | Dónde |
|-------------|-----------------|-------|
| No entendían cómo funcionaba el Eco con los botones "Pasar al día siguiente" y "Volver a hoy". Al ir a la sección Juegos no sabían cuál era el juego de hoy ni de dónde venía el Eco. | Un cartel en Inicio que dice "ECO DE HOY · VIENE DE AYER" y cambia según el día que se elija: deja claro cuál es el juego de hoy y que el Eco viene del día anterior. | Pantalla Inicio (`EcoCard`) |
| Querían saber cuánto dura cada juego antes de empezar. | Se muestra la duración en segundos de cada juego (50, 40, 60, 45, etc.). | Lista de juegos (`GameCard`) e instrucciones (`HowToPlay`) |
| Sugirieron más preguntas para el juego de cultura general. | Sumé preguntas al banco de cultura general. | `src/game/banks/cultura.js` |
| Querían saber en qué juego les iba mejor. | Sección "Récords por juego" con el mejor puntaje de cada uno. | Pantalla Perfil |

## Otras observaciones

- Los juegos de **agilidad mental** (Colores, Cuentas, Orden) les gustaron mucho y fueron los que más les costaron.

## Conclusión

Lo que para mí era evidente (cómo se conecta el Eco con el día de hoy, el modo demo) no lo era para quien
juega por primera vez. Mostrar siempre cuál es el juego de hoy, cuánto dura y cómo te fue en cada uno hizo
que se entienda mejor sin tener que explicar nada.
