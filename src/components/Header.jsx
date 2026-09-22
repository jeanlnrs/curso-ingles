import { topicStatus } from "../utils/progress.js";

export default function Header({ topics, progress }) {
  const masteredCount = topics.filter((t) => topicStatus(progress, t.id) === "mastered").length;

  return (
    <header className="top">
      <div className="title-block">
        <h1>Tablero de Inglés</h1>
        <div className="subtitle">Practica lo aprendido, un tema a la vez</div>
      </div>
      <div className="overall-progress">
        <div className="tally mono">
          {topics.map((t) => (
            <i key={t.id} className={topicStatus(progress, t.id) === "mastered" ? "done" : ""} />
          ))}
        </div>
        <div className="count mono">
          {masteredCount}/{topics.length} temas dominados
        </div>
      </div>
    </header>
  );
}
