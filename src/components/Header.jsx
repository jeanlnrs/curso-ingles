import { topicStatus } from "../utils/progress.js";
import ProgressRing from "./ProgressRing.jsx";

export default function Header() {
  return (
    <div className="brand">
      <span className="brand-mark" aria-hidden="true">TI</span>
      <div>
        <strong>Tablero de Inglés</strong>
        <small>Practica lo aprendido, un tema a la vez</small>
      </div>
    </div>
  );
}

export function SidebarNav({ page, onPanel, onEstudiar }) {
  return (
    <nav className="sidebar-nav" aria-label="Secciones">
      <button type="button" className={"nav-item" + (page === "panel" ? " active" : "")} onClick={onPanel}>
        <span className="icon" aria-hidden="true">🏠</span> Panel
      </button>
      <button type="button" className={"nav-item" + (page === "estudiar" ? " active" : "")} onClick={onEstudiar}>
        <span className="icon" aria-hidden="true">📖</span> Estudiar
      </button>
    </nav>
  );
}

export function SidebarFoot({ topics, progress, streakCount }) {
  const masteredCount = topics.filter((t) => topicStatus(progress, t.id) === "mastered").length;
  const total = topics.length;
  const percent = total ? masteredCount / total : 0;

  return (
    <div className="sidebar-foot">
      <div className="foot-progress">
        <ProgressRing percent={percent} size={36} strokeWidth={4} showCheck />
        <div className="foot-progress-text">
          <span className="count mono">
            {masteredCount}/{total}
          </span>
          <span className="foot-label">temas dominados</span>
        </div>
        {streakCount > 0 && (
          <span
            className="streak-pill mono"
            title={`${streakCount} ${streakCount === 1 ? "día" : "días"} seguidos practicando`}
          >
            🔥 {streakCount}
          </span>
        )}
      </div>
      <p className="hint">Tu progreso se guarda en este navegador.</p>
    </div>
  );
}
