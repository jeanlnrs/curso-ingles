import ProgressRing from "./ProgressRing.jsx";
import Confetti from "./Confetti.jsx";

export default function Summary({ topic, correctCount, justMastered, onRestartQuiz, onShowLesson, onBackToTopics }) {
  const total = topic.questions.length;
  const perfect = correctCount === total;
  const message = perfect
    ? justMastered
      ? "¡Tema dominado! Así se hace."
      : "¡Otra vez perfecto! Repite cuando quieras para reforzarlo."
    : "Vas bien. Repite el tema para mejorar tu marca o sigue con otro.";

  return (
    <div className="summary">
      {justMastered && <Confetti />}
      <div className="eyebrow">
        Tema {topic.num} · {topic.title} — resultado
      </div>
      <div className="summary-score">
        <ProgressRing percent={total ? correctCount / total : 0} size={72} strokeWidth={6} showCheck />
        <div className="score mono">
          {correctCount} <span>/ {total}</span>
        </div>
      </div>
      <p style={{ color: "var(--ink-soft)", maxWidth: "52ch" }}>{message}</p>
      <div className="truco-box">
        <span className="tag">Recuerda</span>
        <span dangerouslySetInnerHTML={{ __html: topic.truco }} />
      </div>
      <div className="summary-actions">
        <button type="button" className="primary-btn" onClick={onRestartQuiz}>
          Repetir tema
        </button>
        <button type="button" className="secondary-btn" onClick={onShowLesson}>
          📖 Ver explicación
        </button>
        <button type="button" className="secondary-btn" onClick={onBackToTopics}>
          Volver a temas
        </button>
      </div>
    </div>
  );
}
