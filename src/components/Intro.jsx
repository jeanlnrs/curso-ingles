import { topicStatus } from "../utils/progress.js";
import { categoryIcon } from "../data/categoryIcons.js";
import { categoryColor } from "../data/categoryColors.js";
import ProgressRing from "./ProgressRing.jsx";

export default function Intro({ topics, progress, lastTopicId, reviewTopic, onSelectTopic }) {
  const total = topics.length;
  const mastered = topics.filter((t) => topicStatus(progress, t.id) === "mastered").length;
  const practiced = topics.filter((t) => topicStatus(progress, t.id) === "practiced").length;
  const newCount = total - mastered - practiced;
  const allMastered = total > 0 && mastered === total;
  const overallPercent = total ? mastered / total : 0;

  const continueTopic = lastTopicId
    ? topics.find((t) => t.id === lastTopicId && topicStatus(progress, t.id) !== "mastered")
    : null;

  const suggestedTopic =
    topics.find((t) => topicStatus(progress, t.id) === "new") ||
    topics.find((t) => topicStatus(progress, t.id) === "practiced" && t.id !== continueTopic?.id) ||
    null;

  const categories = [];
  topics.forEach((t) => {
    let entry = categories.find((c) => c.name === t.category);
    if (!entry) {
      entry = { name: t.category, color: categoryColor(t.category), icon: categoryIcon(t.category), topics: [] };
      categories.push(entry);
    }
    entry.topics.push(t);
  });
  const categoryStats = categories.map((c) => {
    const masteredCount = c.topics.filter((t) => topicStatus(progress, t.id) === "mastered").length;
    return { ...c, masteredCount, ratio: c.topics.length ? masteredCount / c.topics.length : 0 };
  });

  function goToCategory(c) {
    const target = c.topics.find((t) => topicStatus(progress, t.id) !== "mastered") || c.topics[0];
    onSelectTopic(target);
  }

  return (
    <div className="intro">
      <div className="hero">
        <div className="hero-body">
          <div className="eyebrow">Tu progreso</div>
          <h2>{allMastered ? "¡Dominaste todos los temas!" : "Bienvenido a tu tablero de práctica"}</h2>
          <p>
            Cada tema trae una explicación corta para refrescar la memoria, su truco y unas preguntas cortas
            para practicar. Tu avance se guarda automáticamente en este navegador.
          </p>
          <div className="hero-actions">
            {continueTopic && (
              <button type="button" className="primary-btn" onClick={() => onSelectTopic(continueTopic)}>
                Continuar Tema {continueTopic.num}
              </button>
            )}
            {!continueTopic && suggestedTopic && (
              <button type="button" className="primary-btn" onClick={() => onSelectTopic(suggestedTopic)}>
                Empezar Tema {suggestedTopic.num}
              </button>
            )}
            {reviewTopic && (
              <button type="button" className="secondary-btn" onClick={() => onSelectTopic(reviewTopic)}>
                🔄 Repasar Tema {reviewTopic.num}
              </button>
            )}
          </div>
        </div>
        <div className="hero-ring">
          <ProgressRing percent={overallPercent} size={110} strokeWidth={10} />
          <span className="hero-ring-label">{Math.round(overallPercent * 100)}%</span>
        </div>
      </div>

      <div className="stat-cards">
        <div className="stat-card mastered">
          <div className="stat-number mono">{mastered}</div>
          <div className="stat-label">Dominados</div>
        </div>
        <div className="stat-card practiced">
          <div className="stat-number mono">{practiced}</div>
          <div className="stat-label">En progreso</div>
        </div>
        <div className="stat-card new">
          <div className="stat-number mono">{newCount}</div>
          <div className="stat-label">Nuevos</div>
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: 10 }}>Avance por categoría</h3>
        <div className="category-progress">
          {categoryStats.map((c) => (
            <button key={c.name} type="button" className="category-progress-row" onClick={() => goToCategory(c)}>
              <span className="badge-letter" style={{ background: c.color }} aria-hidden="true">
                {c.icon}
              </span>
              <span className="category-progress-info">
                <span className="category-progress-top">
                  <span className="name">{c.name}</span>
                  <span className="count mono">
                    {c.masteredCount}/{c.topics.length}
                  </span>
                </span>
                <span className="bar">
                  <span style={{ width: `${c.ratio * 100}%`, background: c.color }} />
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
