import { topicStatus } from "../utils/progress.js";

export default function Intro({ topics, progress, lastTopicId, reviewTopic, onSelectTopic }) {
  const total = topics.length;
  const mastered = topics.filter((t) => topicStatus(progress, t.id) === "mastered").length;
  const practiced = topics.filter((t) => topicStatus(progress, t.id) === "practiced").length;
  const newCount = total - mastered - practiced;
  const allMastered = total > 0 && mastered === total;

  const continueTopic = lastTopicId
    ? topics.find((t) => t.id === lastTopicId && topicStatus(progress, t.id) !== "mastered")
    : null;

  const suggestedTopic =
    topics.find((t) => topicStatus(progress, t.id) === "new") ||
    topics.find((t) => topicStatus(progress, t.id) === "practiced" && t.id !== continueTopic?.id) ||
    null;

  return (
    <div className="intro">
      <div className="eyebrow">Tu progreso</div>
      <h2>{allMastered ? "¡Dominaste todos los temas!" : "Bienvenido a tu tablero de práctica"}</h2>
      <p className="intro-hint">
        Cada tema trae una explicación corta para refrescar la memoria, su truco y unas preguntas cortas para
        practicar. Tu avance se guarda automáticamente en este navegador.
      </p>

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

      {continueTopic && (
        <button type="button" className="suggestion-card" onClick={() => onSelectTopic(continueTopic)}>
          <div className="suggestion-eyebrow">Continuar donde quedaste</div>
          <div className="suggestion-title">
            Tema {continueTopic.num} · {continueTopic.title}
          </div>
        </button>
      )}

      {reviewTopic && (
        <button type="button" className="suggestion-card review" onClick={() => onSelectTopic(reviewTopic)}>
          <div className="suggestion-eyebrow">🔄 Conviene repasar</div>
          <div className="suggestion-title">
            Tema {reviewTopic.num} · {reviewTopic.title}
          </div>
        </button>
      )}

      {suggestedTopic && (
        <button type="button" className="suggestion-card" onClick={() => onSelectTopic(suggestedTopic)}>
          <div className="suggestion-eyebrow">Tema sugerido</div>
          <div className="suggestion-title">
            Tema {suggestedTopic.num} · {suggestedTopic.title}
          </div>
        </button>
      )}
    </div>
  );
}
