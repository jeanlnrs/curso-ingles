import { topicStatus } from "../utils/progress.js";
import ProgressRing from "./ProgressRing.jsx";

export default function Header({ topics, progress, theme, onToggleTheme, streakCount }) {
  const masteredCount = topics.filter((t) => topicStatus(progress, t.id) === "mastered").length;
  const total = topics.length;
  const percent = total ? masteredCount / total : 0;

  return (
    <header className="top">
      <div className="title-block">
        <h1>Tablero de Inglés</h1>
        <div className="subtitle">Practica lo aprendido, un tema a la vez</div>
      </div>
      <div className="overall-progress">
        {streakCount > 0 && (
          <div className="streak-pill mono" title={`${streakCount} ${streakCount === 1 ? "día" : "días"} seguidos practicando`}>
            🔥 {streakCount}
          </div>
        )}
        <ProgressRing percent={percent} size={40} strokeWidth={4} showCheck />
        <div className="count mono">
          {masteredCount}/{total} temas dominados
        </div>
        <button
          type="button"
          className="theme-toggle"
          onClick={onToggleTheme}
          aria-label={theme === "dark" ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}
          title={theme === "dark" ? "Tema claro" : "Tema oscuro"}
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
      </div>
    </header>
  );
}
