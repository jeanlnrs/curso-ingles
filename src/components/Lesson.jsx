export default function Lesson({ topic, qIndex, finishedOnce, onBeginQuiz, onRestartQuiz, onBackToTopics }) {
  const startLabel = finishedOnce ? "Repetir práctica" : qIndex > 0 ? "Seguir practicando" : "Empezar práctica";

  function handleStart() {
    if (finishedOnce) onRestartQuiz();
    else onBeginQuiz();
  }

  return (
    <>
      <div className="eyebrow">Tema {topic.num} · Explicación</div>
      <h2>{topic.title}</h2>
      <div className="lesson-content" dangerouslySetInnerHTML={{ __html: topic.lesson }} />
      <div className="truco-box">
        <span className="tag">Truco</span>
        <span dangerouslySetInnerHTML={{ __html: topic.truco }} />
      </div>
      <div className="actions-row">
        <button type="button" className="primary-btn" onClick={handleStart}>
          {startLabel}
        </button>
        <button type="button" className="secondary-btn" onClick={onBackToTopics}>
          Volver a temas
        </button>
      </div>
    </>
  );
}
