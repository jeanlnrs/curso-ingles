# Curso de inglés

Proyecto personal para aprender inglés desde cero, en español y con trucos de memoria.

## Contenido

- **`Contexto_Ingles_Para_Otro_Chat.md`** — resumen de todos los temas aprendidos (gramática, ejemplos, trucos). Es la fuente de verdad del contenido.
- **`src/`** — Tablero de Inglés en React (Vite): página interactiva para repasar cada tema (explicación + truco) y practicar con preguntas cortas. El progreso se guarda en el navegador.
  - `src/data/topics.js` — todos los temas, lecciones y preguntas.
  - `src/components/` — componentes de la interfaz (nav de temas, lección, quiz, resumen).
  - `src/utils/progress.js` — lógica de progreso/localStorage y verificación de respuestas.
- **`legacy/`** — versión anterior del tablero en HTML/CSS/JS vanilla (sin build), conservada como referencia.

## Cómo usarlo en desarrollo

```
npm install
npm run dev
```

## Cómo publicarlo

```
npm run build
```

genera la carpeta `dist/` lista para desplegar. El repo incluye un workflow de GitHub Actions (`.github/workflows/deploy.yml`) que compila y publica automáticamente en GitHub Pages con cada push a `main` — para que funcione, hay que configurar una vez en GitHub: Settings → Pages → Source → "GitHub Actions".

## Cómo mantenerlo actualizado

Cada vez que se aprende un tema nuevo, se agrega a `Contexto_Ingles_Para_Otro_Chat.md` y a `src/data/topics.js` (lección, truco y preguntas).
